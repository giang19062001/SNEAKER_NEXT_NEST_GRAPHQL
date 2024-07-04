import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Order } from '../schemas/order.schema';
import { OrderService } from '../services/order.service';



@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderServices: OrderService) {}

  @Query(() => [Order], { name: 'orders' })
  async orders(): Promise<Order[]> {
    return this.orderServices.findAll();
  }
  
  @Query(() => [Order], { name: 'findOrderByUser' })
  async findOrderByUser(@Args('userId') userId : string): Promise<Order[]> {
    if(!userId){
      return []
    }
    const data = await this.orderServices.findOrderByUser(userId);
    console.log(data)
    return data   

  }
}
