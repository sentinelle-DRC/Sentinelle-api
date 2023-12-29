import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import mongoose from 'mongoose';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private userservice: UserService) {}

  @Post()
  create(@Body() createuserdto: CreateUserDto) {
    return this.userservice.create(createuserdto);
  }

  @Get()
  findAll() {
    return this.userservice.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.userservice.findOne(id);
  }
}
