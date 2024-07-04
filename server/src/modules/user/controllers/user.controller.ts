import { UserService } from './../services/user.service';
import { Controller, Post, Body, Get, Redirect, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddUserDto } from 'src/modules/types/user';
import { User } from '../schemas/user.schema';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userServices: UserService) {}

  @Post('add-user')
  @ApiBody({ type: AddUserDto })
  async addUser(@Body() input: AddUserDto): Promise<User> {
    return this.userServices.addUser(input);
  }
}
