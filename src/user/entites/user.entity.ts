import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose/dist';

export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop({ required: true, unique: true })
  phoneNumber: string;
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  lastName: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
