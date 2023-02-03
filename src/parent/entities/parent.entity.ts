import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose/dist';
import { Document } from 'mongoose';

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
  @Prop({ required: true, enum: ['F', 'M'] })
  sex: string;
  @Prop({ required: true })
  address: string;
  @Prop({ required: true })
  password: string;
}
export const ParentSchema = SchemaFactory.createForClass(Parent);
