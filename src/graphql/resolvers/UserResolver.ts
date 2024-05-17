import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../models/User';
import { mockUsers } from '../__mocks__/mockUsers';
import { UserSetting } from '../models/UserSetting';
import { mockUserSettings } from '../__mocks__/mockUserSettings';
import { CreateUserInput } from '../utils/CreateUserInput';

@Resolver((of) => User)
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

  @ResolveField((returns) => UserSetting, { name: 'settings' })
  getUserSettings(@Parent() user: User) {
    return mockUserSettings.find((setting) => setting.userId === user.id);
  }

  @Mutation((returns) => User)
  createUser(@Args('createUserData') createUserData: CreateUserInput) {
    const { username, displayname, email } = createUserData;

    const newUser = {
      username,
      displayname,
      email,
      id:
        Math.floor(Math.random()) * Math.floor(Math.random()) +
        Math.floor(Math.random()),
    };

    mockUsers.push(newUser);
    return newUser;
  }
}
