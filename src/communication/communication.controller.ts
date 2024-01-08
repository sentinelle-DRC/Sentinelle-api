import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CommunicationService } from './communication.service';
import { CreateCommunicationDto } from './dto/create-communication.dto';
import { UpdateCommunicationDto } from './dto/update-communication.dto';
import mongoose from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('communication')
export class CommunicationController {
  constructor(private readonly communicationService: CommunicationService) {}
  @Post()
  create(@Body() createCommunicationDto: CreateCommunicationDto) {
    return this.communicationService.create(createCommunicationDto);
  }
  //for chatbot
  @Get('/chat')
  findAllForChat() {
    return this.communicationService.findAllForChat();
  }
  @Get('/chat/class/:id')
  findByClassForChat(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.communicationService.findByClassForChat(id);
  }
  @Get('/chat/:id')
  findOneForChat(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.communicationService.findOneForChat(id);
  }

  @Get()
  findAll() {
    return this.communicationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.communicationService.findOne(id);
  }
  @Get('/class/:id')
  findByClass(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.communicationService.findByClass(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommunicationDto: UpdateCommunicationDto,
  ) {
    return this.communicationService.update(+id, updateCommunicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.communicationService.remove(id);
  }
  //for chatbot
  // @Get('/chat')
  // findAllForChat() {
  //   return this.communicationService.findAllForChat();
  // }
  // @Get('/chat/class/:id')
  // findByClassForChat(@Param('id') id: mongoose.Schema.Types.ObjectId) {
  //   return this.communicationService.findByClassForChat(id);
  // }
  // @Get('/chat/:id')
  // findOneForChat(@Param('id') id: mongoose.Schema.Types.ObjectId) {
  //   return this.communicationService.findOneForChat(id);
  // }
}
