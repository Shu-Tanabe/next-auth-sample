import { Resolver, Query } from '@nestjs/graphql';
import { User } from './user.model';

@Resolver()
export class UserResolver {
  @Query(() => User)
  async getUser(): Promise<User> {
    const user: User = {
      id: '1',
      email: 'none@example.com',
      name: 'test user',
    };

    return user;
  }
}
