import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Class } from 'src/class/entities/class.entity';
import { Course } from 'src/course/entities/course.entity';
import { Result } from 'src/result/entities/result.entity';

export type WorkDocument = Work & Document;
@Schema({timestamps:true})
export class Work {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  about: string;
  @Prop()
  max: number;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  })
  @Type(() => Course)
  course: Course;
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId }],
    ref: 'Result',
  })
  @Type(() => Result)
  results: Result;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
  })
  @Type(() => Class)
  class: Class;
  
}
export const WorkSchema = SchemaFactory.createForClass(Work);
