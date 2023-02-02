import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose/dist';
import { Document } from 'mongoose';

export type ParentDocument = Parent & Document;

@Schema()
export class Parent {
  @Prop({ required: true, unique: true })
  phoneNumber: String;
  @Prop()
  email: String;
  @Prop({ required: true })
  firstName: String;
  @Prop({ required: true })
  lastName: String;
  @Prop({ required: true, enum: ['F', 'M'] })
  sex: String;
  @Prop({ required: true })
  address: String;
  @Prop({ required: true })
  password: String;
}
export const ParentSchema = SchemaFactory.createForClass(Parent);
