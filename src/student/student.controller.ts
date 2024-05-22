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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

// @UseGuards(JwtAuthGuard)
@ApiTags('Students')
@ApiBearerAuth()
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  // @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }
  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.studentService.findAll();
  }
  @Get('parent/:parentId')
  findByParent(@Param('parentId') parentId: mongoose.Schema.Types.ObjectId) {
    return this.studentService.findByparent(parentId);
  }

  @Get('class/:classId')
  findByClass(@Param('classId') classId: mongoose.Schema.Types.ObjectId) {
    return this.studentService.findByClass(classId);
  }

  // @UseGuards(JwtAuthGuard)
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
  @Patch('abonnement/:id')
  updateStateAbonnement(
    @Param('id') id: mongoose.Schema.Types.ObjectId,
    @Body() value: boolean,
  ) {
    return this.studentService.updateStateAbonnement(id, value);
  }

  @Patch('/average/:id')
  updateAverage(
    @Param('id') id: mongoose.Schema.Types.ObjectId,
    @Body() average: number,
  ) {
    return this.studentService.updateAverage(id, average);
  }

  @Delete(':id')
  remove(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.studentService.remove(id);
  }
}
