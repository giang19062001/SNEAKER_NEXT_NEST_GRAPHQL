import { Controller, Post, Body, Get, Redirect, Query } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaypalService } from '../services/paypal.servie';
import { CreateOrderDto, ExecuteOrderDto } from 'src/modules/types/order';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService,
    private readonly paypalService: PaypalService
  ) {}

  @Post('create-order')
  @ApiBody({ type: CreateOrderDto })
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const orderId = await this.paypalService.createOrder(createOrderDto);
    return { id : orderId}
  }

  @Post('execute-order')
  @ApiBody({ type: ExecuteOrderDto })
  async executePayment(@Body() executeOrderDto: ExecuteOrderDto): Promise<any> {
    try {
      const payment = await this.paypalService.executePayment(executeOrderDto);
      return { payment };
    } catch (error) {
      return { error: error.message };
    }
  }
}