import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Option } from 'src/option/entities/option.entity';
import { School } from 'src/school/entities/school.entity';

export type ClassDocument = Class & Document;
@Schema()
export class Class {
  @Prop({ required: true })
  level: number;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Option',
  })
  @Type(() => Option)
  option: Option;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
  })
  @Type(() => School)
  school: School;
}

export const ClassSchema = SchemaFactory.createForClass(Class);
