import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';



@ObjectType()
@InputType('TimeEffectTypeInput')
export class TimeEffectType {
  @Field(() => Date)
  start: Date;

  @Field(() => Date)
  end: Date;
}

@InputType()
export class CouponInput {
  @Field()
  name: string;

  @Field()
  discount: number;

  @Field()
  type: string;

  @Field()
  condition: number;

  @Field(() => TimeEffectType)
  timeEffect: TimeEffectType;
}

@ObjectType()
@Schema({timestamps : true})
export class Coupon extends Document {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true })
  discount: number;

  @Field()
  @Prop({ required: true })
  type: string; // EX: AMOUNT, %, FREESHIP
  
  @Field()
  @Prop()
  condition: number; // EX: alway > ((number)) 

    
  @Field(()=>TimeEffectType)
  @Prop({ required: true , type : {
    name: { type: Date, required: true },
    price: { type: Date, required: true },
  }})
  timeEffect: TimeEffectType; // thời gian hiệu lực cửa coupon
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);