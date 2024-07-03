import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Coupon, CouponInput } from '../schemas/coupon.schemas';
import { CouponService } from '../services/coupon.service';

@Resolver(() => Coupon)
export class CouponResolver {
  constructor(private readonly couponService: CouponService) {}

  @Query(() => [Coupon], { name: 'coupons' })
  async users(): Promise<Coupon[]> {
    return this.couponService.findAll();
  }

  
  @Mutation(returns => Coupon)
  async addCoupon(@Args('input') input: CouponInput): Promise<Coupon> {
    console.log(input)
    return this.couponService.addCoupon(input);
  }
}
