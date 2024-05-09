import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Alice',
      role: 'ADMIN',
      email: 'alice@example.com',
    },
    {
      id: 2,
      name: 'Bob',
      role: 'ENGINEER',
      email: 'bob@example.com',
    },
    {
      id: 3,
      name: 'Charlie',
      role: 'INTERN',
      email: 'charlie@example.com',
    },
    {
      id: 4,
      name: 'David',
      role: 'ADMIN',
      email: 'david@example.com',
    },
    {
      id: 5,
      name: 'Emma',
      role: 'ENGINEER',
      email: 'emma@example.com',
    },
    {
      id: 6,
      name: 'Frank',
      role: 'INTERN',
      email: 'frank@example.com',
    },
    {
      id: 7,
      name: 'Grace',
      role: 'ADMIN',
      email: 'grace@example.com',
    },
    {
      id: 8,
      name: 'Henry',
      role: 'ENGINEER',
      email: 'henry@example.com',
    },
    {
      id: 9,
      name: 'Ivy',
      role: 'INTERN',
      email: 'ivy@example.com',
    },
    {
      id: 10,
      name: 'Jack',
      role: 'ADMIN',
      email: 'jack@example.com',
    },
  ];

  findAll(role?: 'ADMIN' | 'ENGINEER' | 'INTERN') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  create(user: {
    name: string;
    email: string;
    role: 'ADMIN' | 'ENGINEER' | 'INTERN';
  }) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(
    id: number,
    updatedUser: {
      name?: string;
      email?: string;
      role?: 'ADMIN' | 'ENGINEER' | 'INTERN';
    },
  ) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
