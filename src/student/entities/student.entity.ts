import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose/dist';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Absence } from 'src/absence/entities/absence.entity';
import { Class } from 'src/class/entities/class.entity';
import { Notification } from 'src/notification/entities/notification.entity';
import { Parent } from 'src/parent/entities/parent.entity';
import { Result } from 'src/result/entities/result.entity';
import { School } from 'src/school/entities/school.entity';

export type StudentDocument = Student & Document;
@Schema()
export class Student {
  // @Prop({ unique: true })
  @Prop()
  phoneNumber: string;
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  lastName: string;
  @Prop()
  middleName: string;
  @Prop({ required: true, unique: true })
  code: string;
  // @Prop({ enum: ['F', 'M'] })
  @Prop()
  sex: string;
  @Prop()
  birthDate: string;
  @Prop()
  nationality: string;
  @Prop({ required: true })
  password: string;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
  })
  @Type(() => School)
  school: School;
  @Prop({
    // required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Parent',
  })
  @Type(() => Parent)
  parent: Parent;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
  })
  @Type(() => Class)
  class: Class;
  @Prop({
    // required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId }],
    ref: 'Notification',
  })
  @Type(() => Notification)
  notifications: Notification;
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId }],
    ref: 'Absence',
  })
  @Type(() => Absence)
  absences: Absence;
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId }],
    ref: 'Result',
  })
  @Type(() => Result)
  results: Result;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
