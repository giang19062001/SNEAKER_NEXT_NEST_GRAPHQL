import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserResolver } from './resolvers/user.resolver';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';


@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers:[UserController],
  providers: [UserService, UserResolver],
})
export class UserModule {}
