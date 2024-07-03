import { Sneaker, SneakerSchema } from './schemas/sneaker.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SneakerResolver } from './resolvers/sneaker.resolver';
import { SneakerService } from './services/sneaker.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: Sneaker.name, schema: SneakerSchema }])],
  providers: [SneakerService, SneakerResolver],
})
export class SneakerModule {}
