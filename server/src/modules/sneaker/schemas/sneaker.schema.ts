import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';


@InputType()
export class SneakerInput {
  @Field()
  _id: string;

  @Field()
  name: string;

  @Field()
  price: string;
  
  @Field()
  image: string;
  
}

@ObjectType()
@Schema()
export class Sneaker extends Document {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  price: string;

  @Field()
  @Prop()
  image: string;
}

export const SneakerSchema = SchemaFactory.createForClass(Sneaker);
