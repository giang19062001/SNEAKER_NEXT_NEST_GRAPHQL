import React, { useState } from "react";
import couponLogo from "../../../../public/images/coupon.png";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_COUPONS } from "@/app/graphql/coupon";
import { CouponProps, CouponType } from "@/app/types/coupon";

const Coupon : React.FC<CouponProps> = ({  couponsChoose , callbackCoupon}) => {
  const [openCoupon, setOpenCoupon] = useState(false);
  const { data } = useQuery(GET_COUPONS);

  return (
    <>
      <div
        className="flex  gap-3 text-blue-500 cursor-pointer"
        onClick={() => setOpenCoupon(true)}
      >
        <Image src={couponLogo} alt="" width={25} height={25} />
        <p>Choose coupon</p>
      </div>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={openCoupon}
        onClose={() => setOpenCoupon(false)}
      >
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
          {"COUPON LIST"}
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col">
            {data &&
              data?.coupons.map((cp: CouponType) => (
                <Paper elevation={2} sx={{ padding: 2, mb:2 }} key={cp._id}>
                  <div className={`flex items-center gap-5 cursor-pointer ${couponsChoose.find(fi => fi._id === cp._id) ?'bg-slate-500' : ''}`} 
                  onClick={()=>callbackCoupon(cp)}>
                    <Image src={couponLogo} alt="" width={50} height={50} />
                    <div className="flex flex-col ">
                      <Typography sx={{fontWeight:"bold"}}>{cp.name}</Typography>
                      <Typography>Discount: ${cp.discount}</Typography>
                    </div>
                  </div>
                </Paper>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Coupon;
