import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from 'src/student/student.module';
import { WorkModule } from 'src/work/work.module';
import { Result, ResultSchema } from './entities/result.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Result.name,
        schema: ResultSchema,
      },
    ]),
    StudentModule,
    WorkModule,
  ],
  providers: [ResultService],
  controllers: [ResultController],
  exports: [ResultService],
})
export class ResultModule {}
