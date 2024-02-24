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
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import mongoose from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@UseGuards(JwtAuthGuard)
@ApiTags('Teacher')
@ApiBearerAuth()
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @Get()
  findAll() {
    return this.teacherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.teacherService.findOne(id);
  }
  @Get('school/:schoolId')
  findAllbySchool(@Param('schoolId') schoolId: mongoose.Schema.Types.ObjectId) {
    return this.teacherService.findAllBySchooll(schoolId);
  }

  @Patch(':id')
  update(
    @Param('id') id: mongoose.Schema.Types.ObjectId,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ) {
    return this.teacherService.update(id, updateTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.teacherService.remove(id);
  }
}
