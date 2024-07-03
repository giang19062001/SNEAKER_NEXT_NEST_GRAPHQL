

import { ApiProperty } from '@nestjs/swagger';

export class ExecuteOrderDto {
  @ApiProperty()
  paymentID: string;
  
  @ApiProperty()
  payerID: string;

  @ApiProperty()
  orderPaypalID: string
}


export class cartDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  quantity: number;

}

export class CreateOrderDto {
    @ApiProperty()
    user: string;
  
    @ApiProperty()
    amount: string;
  
    @ApiProperty()
    ship: string;
  
    @ApiProperty()
    phone: string;
  
    @ApiProperty()
    address: string;
  
    @ApiProperty({ type: [cartDto] }) 
    cart: cartDto[];
  }

  export type cartPayPal = { 
    name: string
    price: string
    quantity: number 
    currency: string
}

export type cartPayPalList = cartPayPal[]