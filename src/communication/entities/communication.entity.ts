import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Class } from 'src/class/entities/class.entity';
import mongoose from 'mongoose';
import { Type } from 'class-transformer';

export type CommunicationDocument = Communication & Document;
@Schema({ timestamps: true })
export class Communication {
  @Prop({ require: true })
  title: string;
  @Prop({ required: true })
  content: string;
  @Prop()
  cover: string;
  @Prop({
    require: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
  })
  @Type(() => Class)
  class: Class;
}

export const CommunicationSchema = SchemaFactory.createForClass(Communication);
