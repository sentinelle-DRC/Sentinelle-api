import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Class } from 'src/class/entities/class.entity';
import { Course } from 'src/course/entities/course.entity';

export type ScheduleDocument = Schedule & Document;
@Schema()
export class Schedule {
  @Prop({ required: true })
  day: string;
  @Prop({ required: true })
  startHour: number;
  @Prop({ required: true })
  endHour: number;
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Class' })
  @Type(() => Class)
  class: Class;
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Course' })
  @Type(() => Course)
  course: Course;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
