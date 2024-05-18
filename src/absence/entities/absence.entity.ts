import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Student } from 'src/student/entities/student.entity';

export type AbsenceDocument = Absence & Document;
@Schema({ timestamps: true })
export class Absence {
  @Prop()
  justification: string;
  @Prop({ required: true })
  date: Date;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  })
  @Type(() => Student)
  student: Student;
}

export const AbsenceSchema = SchemaFactory.createForClass(Absence);
