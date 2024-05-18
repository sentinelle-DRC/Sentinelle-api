import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Class } from 'src/class/entities/class.entity';

export type OptionDocument = Option & Document;
@Schema({ timestamps: true })
export class Option {
  @Prop({ required: true })
  name: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }], ref: 'Class' })
  @Type(() => Class)
  classes: Class;
}
export const OptionSchema = SchemaFactory.createForClass(Option);
