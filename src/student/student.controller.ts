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
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiTags } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

// @UseGuards(JwtAuthGuard)
@ApiTags('Students')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    console.log(createStudentDto, 'dto');
    return this.studentService.create(createStudentDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.studentService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.studentService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: mongoose.Schema.Types.ObjectId,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentService.update(id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.studentService.remove(id);
  }
}
