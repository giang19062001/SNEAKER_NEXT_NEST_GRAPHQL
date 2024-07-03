import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User, UserInput } from '../schemas/user.schema';
import { UserService } from '../services/user.service';


@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userServices: UserService) {}

  @Query(() => [User], { name: 'users' })
  async users(): Promise<User[]> {
    return this.userServices.findAll();
  }

  @Query(() => User, { name: 'findUser' })
  async findUser(@Args('email') email : string): Promise<User> {
    return this.userServices.findByEmail(email);
    
  }


  @Mutation(returns => User)
  async addUser(@Args('input') input: UserInput): Promise<User> {
    return this.userServices.addUser(input);
  }
}
