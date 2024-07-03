import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/modules/user/schemas/user.schema';


//VÌ VỪA LÀ DTO ==> InputType, VỪA LÀ TYPE ==> ObjectType
@ObjectType('CartItem')
@InputType('CartItemInput')
export class CartItem{
  @Field(() => ID)
  _id: string;

  @Field()
  name: string;

  @Field()
  price: string;

  @Field()
  image: string;

  @Field()
  quantity: number;
}

@InputType()
export class OrderInput {
  @Field()
  user: string;

  @Field()
  amount: string;

  @Field()
  ship: number;

  @Field()
  phone: string;

  @Field()
  address: string;

  @Field(() => [CartItem])
  cart: CartItem[];
}


@ObjectType()
@Schema({timestamps : true})
export class Order extends Document {
  @Field(() => ID)
  _id: string;

  @Field(() => User)
  @Prop({ required: true,  type: mongoose.Schema.Types.ObjectId, ref: 'User'  })
  user: User;

  @Field()
  @Prop({ required: true })
  amount: number;

  @Field()
  @Prop({ required: true })
  ship: number;

  @Field()
  @Prop({ required: true })
  phone: string;

  @Field()
  @Prop({ required: true })
  address: string;

  @Field()
  @Prop({ required: false, default: false })
  approve: boolean;

  
  @Field()
  @Prop({ required: true })
  orderPaypalID: string;

  @Field(() => [CartItem])
  @Prop({
    type: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Sneaker', required: true },
        name: { type: String, required: true },
        price: { type: String, required: true },
        image: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    required: true,
  })
  cart: CartItem[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);