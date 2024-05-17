import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ResultService } from './result.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateResultDto } from './dto/create-result.dto';
import mongoose from 'mongoose';

@Controller('result')
@ApiTags('results')
export class ResultController {
  constructor(private resultService: ResultService) {}
  @Post()
  create(@Body() createResultDto: CreateResultDto) {
    return this.resultService.create(createResultDto);
  }
  //get all results
  @Get('/')
  getAllResut() {
    return this.resultService.findAllResult();
  }
  //gett all results for chat
  @Get('/chat/:id')
  chatGetAllresult(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.resultService.findResultForAllCourseForOneStudentChat(id);
  }
  @Get('/:studentId')
  findAllResultForAllCourseForStudent(
    @Param('studentId') studentId: mongoose.Schema.Types.ObjectId,
  ) {
    return this.resultService.findResultForAllCourseForOneStudent(studentId);
  }

  @Get('/:studentId/course/:courseId')
  findAllResultForAllCourseForStudentByCourse(
    @Param('studentId') studentId: mongoose.Schema.Types.ObjectId,
    @Param('courseId') courseId: mongoose.Schema.Types.ObjectId,
  ) {
    return this.resultService.findResultForAllCourseForOneStudentByCourse(
      studentId,
      courseId,
    );
  }

  @Get('/average/:studentId')
  findAllAverageResultForAllCourseForStudent(
    @Param('studentId') studentId: string,
  ) {
    return this.resultService.findAverageResultForAllCourseForOneStudent(
      studentId,
    );
  }
  @Get('/:studentId/work/:workId')
  findOneResult(
    @Param('studentId') studentId: mongoose.Schema.Types.ObjectId,
    @Param('workId') workId: mongoose.Schema.Types.ObjectId,
  ) {
    return this.resultService.findOneResult(studentId, workId);
  }
}
