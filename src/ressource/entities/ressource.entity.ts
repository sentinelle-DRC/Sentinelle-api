import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Field } from 'src/field/entities/field.entity';

export type RessourceDocument = Ressource & Document;

@Schema()
export class Ressource {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  details: string;

  @Prop({ required: true, enum: ['pdf', 'book', 'ext', 'video'] })
  type: string;

  @Prop({ required: true, enum: [0, 1, 2] })
  level: number;

  @Prop({ required: true })
  uri: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Field.name,
  })
  @Type(() => Field)
  field: mongoose.Schema.Types.ObjectId;
}

export const RessourceSchema = SchemaFactory.createForClass(Ressource);
