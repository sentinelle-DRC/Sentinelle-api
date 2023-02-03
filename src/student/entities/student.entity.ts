import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose/dist';
import { Document } from 'mongoose';
export type StudentDocument = Student & Document;

@Schema()
export class Student {
  @Prop({ required: true, unique: true })
  phoneNumber: string;
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  lastName: string;
  @Prop({ required: true })
  middleName: string;
  @Prop({ required: true, enum: ['F', 'M'] })
  sex: string;
  @Prop({ required: true })
  birthDate: string;
  @Prop({ required: true })
  nationality: string;
  @Prop({ required: true })
  password: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
