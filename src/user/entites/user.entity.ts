import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose/dist';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { School } from 'src/school/entities/school.entity';

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
  @Prop({ required: true, enum: ['admin', 'user'] })
  role: string;
  @Prop({
    // required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
  })
  @Type(() => School)
  school: School;
}

export const UserSchema = SchemaFactory.createForClass(User);
