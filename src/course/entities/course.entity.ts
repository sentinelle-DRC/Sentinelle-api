import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Field } from 'src/field/entities/field.entity';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Field.name,
  })
  @Type(() => Field)
  field: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
