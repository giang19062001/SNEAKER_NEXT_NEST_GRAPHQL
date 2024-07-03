import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Order } from '../schemas/order.schema';
import { OrderService } from '../services/order.service';



@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderServices: OrderService) {}

  @Query(() => [Order], { name: 'orders' })
  async users(): Promise<Order[]> {
    return this.orderServices.findAll();
  }

}
