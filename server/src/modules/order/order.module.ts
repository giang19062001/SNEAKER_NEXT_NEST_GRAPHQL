import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderService } from './services/order.service';
import { Order, OrderSchema } from './schemas/order.schema';
import { OrderResolver } from './resolvers/order.resolver';
import { OrderController } from './controllers/order.controller';
import { PaypalService } from './services/paypal.servie';


@Module({
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])],
  controllers:[OrderController],
  providers: [OrderService, OrderResolver, PaypalService],
})
export class OrderModule {}
