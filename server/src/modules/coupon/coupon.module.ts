import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Coupon, CouponSchema } from './schemas/coupon.schemas';
import { CouponService } from './services/coupon.service';
import { CouponResolver } from './resolvers/coupon.resolver';


@Module({
  imports: [MongooseModule.forFeature([{ name: Coupon.name, schema: CouponSchema }])],
  providers: [CouponService, CouponResolver],
})
export class CouponModule {}
