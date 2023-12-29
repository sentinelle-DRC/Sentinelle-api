import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Student, StudentSchema } from './entities/student.entity';
import { SchoolModule } from 'src/school/school.module';
import { ParentModule } from 'src/parent/parent.module';
import { ClassModule } from 'src/class/class.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
    SchoolModule,
    ParentModule,
    ClassModule,
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
