import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coupon, CouponInput } from '../schemas/coupon.schemas';

@Injectable()
export class CouponService {
  constructor(
    @InjectModel(Coupon.name) private couponModel: Model<Coupon>,
  ) {}

  async findAll(): Promise<Coupon[]> {
    return this.couponModel.find().exec();
  }

  async addCoupon(input: CouponInput): Promise<Coupon> {
      const createdUser = new this.couponModel(input);
      return createdUser.save();
  }
}
