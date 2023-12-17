import { Module, forwardRef } from '@nestjs/common';
import { FieldService } from './field.service';
import { FieldController } from './field.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Field, FieldSchema } from './entities/field.entity';
import { CourseModule } from 'src/course/course.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Field.name, schema: FieldSchema }]),
    forwardRef(() => CourseModule),
  ],
  controllers: [FieldController],
  providers: [FieldService],
})
export class FieldModule {}
