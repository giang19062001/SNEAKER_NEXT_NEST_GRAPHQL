
export interface CouponProps {
    couponsChoose: CouponTypeList
    callbackCoupon: (cp: CouponType) => void;
  }

  export type CouponType = {
    _id: string
    name: string
    discount: number
}

export type CouponTypeList = CouponType[]