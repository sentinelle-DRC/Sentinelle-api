import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Course } from 'src/course/entities/course.entity';
import { Result } from 'src/result/entities/result.entity';

export type WorkDocument = Work & Document;
@Schema()
export class Work {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  about: string;
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
}
export const WorkSchema = SchemaFactory.createForClass(Work);
