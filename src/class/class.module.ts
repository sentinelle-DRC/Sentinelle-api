import { Module, forwardRef } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Class, ClassSchema } from './entities/class.entity';
import { SchoolModule } from 'src/school/school.module';
import { OptionModule } from 'src/option/option.module';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Class.name, schema: ClassSchema }]),
    SchoolModule,
    OptionModule,
    forwardRef(() => StudentModule),
  ],
  controllers: [ClassController],
  providers: [ClassService],
  exports: [ClassService],
})
export class ClassModule {}
