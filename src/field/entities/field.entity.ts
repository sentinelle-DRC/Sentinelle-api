import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Course } from 'src/course/entities/course.entity';

export type FieldDocument = Field & Document;

@Schema()
export class Field {
  @Prop({ required: true })
  name: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }], ref: 'Course' })
  @Type(() => Course)
  courses: Course;
}

export const FieldSchema = SchemaFactory.createForClass(Field);
