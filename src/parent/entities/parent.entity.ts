import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose/dist';
import { Type } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { Student } from 'src/student/entities/student.entity';

export type ParentDocument = Parent & Document;

@Schema()
export class Parent {
  @Prop({ required: true, unique: true })
  phoneNumber: string;
  @Prop()
  email: string;
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  lastName: string;
  // @Prop({ enum: ['F', 'M'] })
  @Prop()
  sex: string;
  @Prop()
  address: string;
  @Prop()
  profil: string;
  @Prop({ required: true })
  password: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }], ref: 'Student' })
  @Type(() => Student)
  students: Student;
  @Prop()
  codes: string[];
}
export const ParentSchema = SchemaFactory.createForClass(Parent);
