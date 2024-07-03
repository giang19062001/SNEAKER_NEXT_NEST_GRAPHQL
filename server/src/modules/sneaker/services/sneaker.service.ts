import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sneaker } from '../schemas/sneaker.schema';

@Injectable()
export class SneakerService {
  constructor(
    @InjectModel(Sneaker.name) private sneakerModel: Model<Sneaker>,
  ) {}

  async findAll(): Promise<Sneaker[]> {
    return this.sneakerModel.find().exec();
  }
}
