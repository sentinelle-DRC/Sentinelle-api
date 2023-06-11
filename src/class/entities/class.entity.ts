import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Communication } from 'src/communication/entities/communication.entity';
import { Option } from 'src/option/entities/option.entity';
import { School } from 'src/school/entities/school.entity';
import { Student } from 'src/student/entities/student.entity';
export type ClassDocument = Class & Document;
@Schema()
export class Class {
  @Prop({ required: true })
  level: number;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Option.name,
  })
  @Type(() => Option)
  option: Option;

  @Prop({
    default: [],
    type: [{ type: mongoose.Schema.Types.ObjectId }],
    ref: 'Student',
  })
  @Type(() => Student)
  students: Student;

  @Prop({
    default: [],
    type: [{ type: mongoose.Schema.Types.ObjectId }],
    ref: 'Communication',
  })
  @Type(() => Communication)
  communications: Communication;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
  })
  @Type(() => School)
  school: School;
}

export const ClassSchema = SchemaFactory.createForClass(Class);
