import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Class } from 'src/class/entities/class.entity';
import { Student } from 'src/student/entities/student.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';

export type SchoolDocument = School & Document;
@Schema()
export class School {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  address: string;
  @Prop()
  email: string;
  @Prop({ required: true, unique: true })
  phoneNumber: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }], ref: 'Student' })
  @Type(() => Student)
  students: Student;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }], ref: 'Class' })
  @Type(() => Class)
  classes: Class;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }], ref: 'Teacher' })
  @Type(() => Teacher)
  teachers: Teacher;
}

export const SchoolSchema = SchemaFactory.createForClass(School);
