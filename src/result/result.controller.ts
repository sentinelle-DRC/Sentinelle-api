import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ResultService } from './result.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateResultDto } from './dto/create-result.dto';
import mongoose from 'mongoose';

@Controller('result')
@ApiTags('Students')
export class ResultController {
  constructor(private resultService: ResultService) {}
  @Post()
  create(@Body() createResultDto: CreateResultDto) {
    return this.resultService.create(createResultDto);
  }
  @Get('/:studentId')
  findAllResultForAllCourseForStudent(
    @Param('studentId') studentId: mongoose.Schema.Types.ObjectId,
  ) {
    return this.resultService.findResultForAllCourseForOneStudent(studentId);
  }
  @Get('/:studentId/:workId')
  findOneResult(
    @Param('studentId') studentId: mongoose.Schema.Types.ObjectId,
    @Param('workId') workId: mongoose.Schema.Types.ObjectId,
  ) {
    return this.resultService.findOneResult(studentId, workId);
  }
}
