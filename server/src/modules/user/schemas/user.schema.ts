import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@InputType()
export class UserInput {
  @Field()
  name: string;

  @Field()
  email: string;
  
  @Field()
  provider: string;
  
}

@ObjectType()
@Schema()
export class User extends Document {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  email: string;

  @Field()
  @Prop({default: 'google'})
  provider: string;

  @Field()
  @Prop({default: ''})
  phone: string;

  @Field()
  @Prop({default: ''})
  address: string;

  @Field()
  @Prop({ required: true })
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);