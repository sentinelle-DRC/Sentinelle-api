import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose/dist';
import { Document } from 'mongoose';
export type StudentDocument = Student & Document;

@Schema()
export class Student {
  @Prop({ required: true, unique: true })
  phoneNumber: String;
  @Prop({ required: true })
  firstName: String;
  @Prop({ required: true })
  lastName: String;
  @Prop({ required: true })
  middleName: String;
  @Prop({ required: true, enum: ['F', 'M'] })
  sex: String;
  @Prop({ required: true })
  birthDate: String;
  @Prop({ required: true })
  nationality: String;
  @Prop({ required: true })
  password: String;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
