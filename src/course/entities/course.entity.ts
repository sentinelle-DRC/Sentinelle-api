import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Class } from 'src/class/entities/class.entity';
import { Field } from 'src/field/entities/field.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
// import { Teacher } from 'src/teacher/entities/teacher.entity';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop()
  max: number;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Field.name,
  })
  @Type(() => Field)
  field: mongoose.Schema.Types.ObjectId;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
  })
  @Type(() => Class)
  class: mongoose.Schema.Types.ObjectId;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
  })
  @Type(() => Teacher)
  teacher: mongoose.Schema.Types.ObjectId;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
