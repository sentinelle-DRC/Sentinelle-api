import { Module, forwardRef } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Teacher, TeacherSchema } from './entities/teacher.entity';
import { CourseModule } from 'src/course/course.module';
import { SchoolModule } from 'src/school/school.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Teacher.name, schema: TeacherSchema }]),
    forwardRef(() => CourseModule),
    SchoolModule,
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TeacherService],
})
export class TeacherModule {}
