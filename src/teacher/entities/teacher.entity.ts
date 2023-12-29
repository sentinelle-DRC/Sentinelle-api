import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
// import { type } from 'os';
import { Course } from 'src/course/entities/course.entity';
import { School } from 'src/school/entities/school.entity';

export type TeacherDocument = Teacher & Document;

@Schema()
export class Teacher {
  @Prop({ required: true })
  public firstName: string;
  @Prop({ required: true })
  public lastName: string;
  @Prop({ required: true })
  public phoneNumber: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }], ref: 'Course' })
  @Type(() => Course)
  public courses: Course;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'School' })
  @Type(() => School)
  public school: mongoose.Schema.Types.ObjectId;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
