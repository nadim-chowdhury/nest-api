import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/User';
import { Repository } from 'typeorm';

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

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  getUsers() {
    return this.usersRepository.find();
  }

  findAll(role?: 'ADMIN' | 'ENGINEER' | 'INTERN') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updatedUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUserDto };
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
