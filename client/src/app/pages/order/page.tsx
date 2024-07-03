"use client";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Map from "@/app/components/map";
import Phone from "@/app/components/phone";
import { TextField, Typography } from "@mui/material";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import CartList from "@/app/components/order/list";
import LayoutUser from "@/app/components/layout-user";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import {
  CreateOrderDtoInitial,
  CreateOrderDto,
  cartDto,
  ExecuteOrderDto,
} from "@/app/types/order";
import { CouponType, CouponTypeList } from "@/app/types/coupon";
import Coupon from "@/app/components/coupon/coupon";

const Cart = () => {
  //INFO ORDER
  const [number, setNumber] = useState<string>("");
  const { data: session, status } = useSession();

  //COUPON
  const [couponsChoose, setCouponsChoose] = useState<CouponTypeList>([]);
  const handleChooseCoupon = (cp: CouponType) => {
    const checkExist = couponsChoose.find((ele: any) => ele._id === cp._id);
    let newCoupons = [];
    if (checkExist) {
      newCoupons = couponsChoose.filter((ele) => ele._id !== cp._id);
    } else {
      newCoupons = [...couponsChoose, cp];
    }
    setCouponsChoose(newCoupons);
  };

  console.log("couponsChoose", couponsChoose);

  //ORDER
  const sneakerCart = useSelector((state: any) => state.order.list);
  const [order, setOrder] = useState<CreateOrderDto>(CreateOrderDtoInitial);

  const createOrder = async () => {
    if (!session?.user) {
      toast.error("Please Login!");
      return;
    }
    console.log("order", order);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/order/create-order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      }
    );
    const result = await res.json();
    console.log("create-order", result);
    return result.id;
  };

  const onApprove = async (data: any) => {
    console.log("onApprove", data);
    const dataApprove: ExecuteOrderDto = {
      paymentID: data.paymentID,
      payerID: data.payerID,
      orderPaypalID: data.orderID,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/order/execute-order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataApprove),
      }
    );
    const payment = await res.json();
    console.log("Payment captured:", payment);
  };

  //MAP
  const [libraries] = useState<any[]>(["places"]);
  const [load, setLoad] = useState(false);
  const [distance, setDistance] = useState("0 km");
  const [duration, setDuration] = useState("0 hour");
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const destiantionRef = useRef<any>();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
    libraries,
  });

  useEffect(() => {
    if (!isLoaded) {
      console.log("connect api map fail");
    } else {
      setLoad(true);
    }
  }, [isLoaded]);

  //change user
  useEffect(() => {
    if (session?.user) {
      const user = session?.user as any;
      setOrder((preState) => ({
        ...preState,
        user: user._id,
      }));
    }
  }, [session?.user]);

  //change cart
  useEffect(() => {
    const amount = sneakerCart.reduce(
      (accumulator: string, currentValue: cartDto) =>
        parseInt(accumulator) +
        parseInt(currentValue.price) * currentValue.quantity,
      0
    );
    setOrder((preState) => ({
      ...preState,
      cart: sneakerCart,
      amount: amount.toFixed(2),
    }));
  }, [sneakerCart]);

  //change phone
  useEffect(() => {
    setOrder((preState) => ({
      ...preState,
      phone: number,
    }));
  }, [number]);

  const calculateRoute = async () => {
    try {
      if (destiantionRef?.current?.value === "") {
        return null;
      } else {
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService();
        const results: any = await directionsService.route({
          origin:
            "PMHG+R6V, Bình Hưng, Bình Chánh, Thành phố Hồ Chí Minh, Việt Nam",
          destination: destiantionRef.current.value,
          // eslint-disable-next-line no-undef
          travelMode: google.maps.TravelMode.DRIVING,
          //DRIVING ,BYCLCLING , WALKING , TRANSIT
        });

        setDirectionsResponse(results);
        setDistance(results.routes[0].legs[0].distance.text);
        setDuration(results.routes[0].legs[0].duration.text);

        let distanceCustom = 0;
        const distance =
          results.routes[0].legs[0].distance.text.split(/\s/)?.[0];
        if (distance.includes(",")) {
          distanceCustom = Math.ceil(Number(distance.replace(",", ".")));
        } else {
          distanceCustom = Number(distance.split(".").join(""));
        }

        //change address
        setOrder((preState) => ({
          ...preState,
          address: results.request.destination.query,
          ship: (distanceCustom * 0.5).toFixed(2),
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LayoutUser>
      <div className="container mx-auto flex justify-center items-center flex-wrap pt-4 pb-12 mt-32">
        <div className="flex h-full flex-col bg-white border-2	w-full">
          <CartList></CartList>
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex flex-col md:flex-row  justify-between gap-10 mt-6">
              <Map load={load} directionsResponse={directionsResponse}></Map>
              <div className="flex flex-col  items-center gap-6 w-full">
                {load && (
                  <Autocomplete>
                    <TextField
                      type="text"
                      label="Address"
                      fullWidth
                      sx={{
                        width: 500,
                        ".MuiOutlinedInput-root": {
                          borderRadius: 5,
                        },
                      }}
                      inputRef={destiantionRef}
                      onBlur={calculateRoute}
                    />
                  </Autocomplete>
                )}
                {/* <div className="flex flex-row  justify-center gap-20">
                  <Typography>Distance : {distance} </Typography>
                  <Typography>Duration : {duration} </Typography>
                </div> */}
                <Phone
                  number={number}
                  callbackPhone={(value: string) => setNumber(value)}
                ></Phone>
                <Coupon
                  couponsChoose={couponsChoose}
                  callbackCoupon={(value: CouponType) =>
                    handleChooseCoupon(value)
                  }
                ></Coupon>
                <div className="flex flex-col justify-evenly text-base font-medium text-gray-900">
                  <div className="flex flex-row ">
                    <p className="w-72">Subtotal:</p>
                    <p className="w-24">${order.amount}</p>
                  </div>
                  <div className="flex flex-row">
                    <p className="w-72"> Ship Money:</p>
                    <p className="w-24">
                      ${parseInt(order.ship).toFixed(2).toString()}
                    </p>
                  </div>
                  <hr className="my-2" />
                  <div className="flex flex-row">
                    <p className="w-72">Total:</p>
                    <p className="w-24">
                      $
                      {(parseInt(order.amount) + parseInt(order.ship))
                        .toFixed(2)
                        .toString()}
                    </p>
                  </div>
                </div>
                <PayPalScriptProvider
                  options={{ clientId: `${process.env.NEXT_PUBLIC_PAYPAL}` }}
                >
                  <PayPalButtons
                    style={{ layout: "horizontal" }}
                    forceReRender={[order]}
                    createOrder={createOrder}
                    onApprove={onApprove}
                  />
                </PayPalScriptProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutUser>
  );
};

export default Cart;
