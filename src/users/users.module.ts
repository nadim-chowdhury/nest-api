import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserResolver } from './UserResolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/User';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UserResolver],
})
export class UsersModule {}
