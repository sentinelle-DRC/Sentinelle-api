import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Course } from 'src/course/entities/course.entity';
import { Ressource } from 'src/ressource/entities/ressource.entity';

export type FieldDocument = Field & Document;
@Schema({ timestamps: true })
export class Field {
  @Prop({ required: true })
  name: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }], ref: 'Course' })
  @Type(() => Course)
  courses: Course;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }], ref: 'Ressource' })
  @Type(() => Ressource)
  ressources: Ressource;
}

export const FieldSchema = SchemaFactory.createForClass(Field);
