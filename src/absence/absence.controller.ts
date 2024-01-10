import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AbsenceService } from './absence.service';
import { CreateAbsenceDto } from './dto/create-absence.dto';
import mongoose from 'mongoose';

@Controller('absence')
export class AbsenceController {
  constructor(private readonly absenceService: AbsenceService) {}
  @Post()
  create(@Body() createAbsenceDto: CreateAbsenceDto) {
    return this.absenceService.create(createAbsenceDto);
  }
  //-------------for chat-----------------------
  @Get('/chat')
  findAllForChat() {
    return this.absenceService.findAllForChat();
  }
  @Get('/chat/:id')
  findOneForChat(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.absenceService.findOneForChat(id);
  }
  //-------------for chat-----------------------
  @Get()
  findAll() {
    return this.absenceService.findAll();
  }
  @Get('/:id')
  findOne(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.absenceService.findOne(id);
  }
}
