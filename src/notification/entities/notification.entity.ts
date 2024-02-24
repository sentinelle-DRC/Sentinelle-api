import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Student } from 'src/student/entities/student.entity';

export type NotificationDocument = Notification & Document;
@Schema()
export class Notification {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
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

export const NotificationSchema = SchemaFactory.createForClass(Notification);
