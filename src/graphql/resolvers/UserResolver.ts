import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { User } from '../models/User';
import { mockUsers } from '../__mocks__/mockUsers';

@Resolver()
export class UserResolver {
  @Query((returns) => User)
  getUser() {
    return {
      id: 1,
      username: 'Moye Moye',
      displayname: 'Joy Bangla',
    };
  }

  @Query((returns) => User, { nullable: true })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return mockUsers.find((user) => user.id === id);
  }

  @Query((returns) => [User])
  getUsers() {
    return mockUsers;
  }
}
