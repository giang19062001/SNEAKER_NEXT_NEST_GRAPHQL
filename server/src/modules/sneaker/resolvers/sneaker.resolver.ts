import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { Sneaker } from '../schemas/sneaker.schema';
import { SneakerService } from '../services/sneaker.service';

@Resolver(() => Sneaker)
export class SneakerResolver {
  constructor(private readonly sneakerService: SneakerService) {}

  @Query(() => [Sneaker], { name: 'sneakers' })
  async users(): Promise<Sneaker[]> {
    return this.sneakerService.findAll();
  }


  @ResolveField('formatNumber', returns => String)
  formatNumber(@Parent() sneaker: Sneaker) {
    return parseInt(sneaker.price).toFixed(2)
  }
}
