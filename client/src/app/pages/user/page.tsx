"use client";
import LayoutUser from "@/app/components/layout-user";
import CustomizedSteppers from "@/app/components/userinfo/stepper";
import { GET_ORDER_BY_USER } from "@/app/graphql/order";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import React from "react";

const UserInfo = () => {
  const { data: session, status } = useSession();

  const { data } = useQuery(GET_ORDER_BY_USER, {
    variables: { userId: session?.user ? session?.user._id : "" },
  });
  console.log("data", data);

  return (
    <LayoutUser>
      <div className="container mx-auto flex justify-center items-center flex-wrap pt-4 pb-12 mt-24">
        <div className="flex h-full flex-col bg-white	w-full">
          <nav className="w-full z-30 top-0 px-6 py-1 flex flex-col gap-5">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2">
              <a
                className=" tracking-wide no-underline hover:no-underline font-bold text-neutral-800 text-xl "
                href="#"
              >
                Order history
              </a>
            </div>

            {data &&
              data.findOrderByUser.map((ord: any) => (
                <div
                  key={ord._id}
                  className="flex items-center gap-10 border-2 rounded-lg p-4"
                >
                  <div className="w-4/12">
                    <p className="text-center text-md mb-3 text-white rounded-md" style={{backgroundColor:"#242645"}}>
                      <b>{ord._id}</b>
                    </p>

                    <p className="text-neutral-900">
                      Phone order: {ord.phone}
                    </p>
                    <p className="text-neutral-900">
                      Amount:{" "}
                      <b className="text-red-500">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(ord.amount)}
                      </b>
                    </p>
                    <p className="text-neutral-900">
                      CreateAt :{" "}
                        {new Date(parseInt(ord.createdAt)).toLocaleString()}
                    </p>
                    <p className="text-neutral-900">
                      Address delivery: {ord.address}
                    </p>
                    <CustomizedSteppers
                      status={ord.status}
                    ></CustomizedSteppers>
                  </div>

                  <div className="w-8/12 overflow-x-scroll flex gap-20 ">
                    {ord.cart &&
                      ord.cart.map((sneaker: any) => (
                        <div key={sneaker._id} className="flex flex-col py-6">
                          <div className="h-40 w-40 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={sneaker.image}
                              alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="ml-4 flex flex-1 flex-col mt-1">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href="#">{sneaker.name}</a>
                                </h3>
                              </div>
                              <p className=" mt-1 text-sm text-gray-500">
                                Quantity: <b>{sneaker.quantity}</b>
                              </p>
                              <p className=" mt-1 text-sm text-gray-500">
                                Price: <b>{sneaker.price}</b>
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </nav>
        </div>
      </div>
    </LayoutUser>
  );
};
export default UserInfo;
