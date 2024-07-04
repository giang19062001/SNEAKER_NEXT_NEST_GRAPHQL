import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { AddUserDto } from 'src/modules/types/user';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({email : email}).exec();
  }
  async addUser(input: AddUserDto): Promise<User> {
    const user = await this.userModel.findOne({email: input.email})
    if(user){
      return user
    }else{
      const createdUser = new this.userModel(input);
      return createdUser.save();
    }
  }
}
