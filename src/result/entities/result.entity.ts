import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Student } from 'src/student/entities/student.entity';
import { Work } from 'src/work/entities/work.entity';

export type ResultDocument = Result & Document;
@Schema({ timestamps: true })
export class Result {
  @Prop({ required: true })
  max: number;
  @Prop({ required: true })
  cote: number;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  })
  @Type(() => Student)
  student: Student;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Work',
  })
  @Type(() => Work)
  work: Work;
}

export const ResultSchema = SchemaFactory.createForClass(Result);
