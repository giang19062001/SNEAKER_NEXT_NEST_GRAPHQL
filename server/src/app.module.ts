import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './modules/user/user.module';
import { join } from 'path';
import { SneakerModule } from './modules/sneaker/sneaker.module';
import { OrderModule } from './modules/order/order.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql.gql'),
    }),
    MongooseModule.forRoot(process.env.MONGODB),
    SneakerModule, UserModule, OrderModule
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
