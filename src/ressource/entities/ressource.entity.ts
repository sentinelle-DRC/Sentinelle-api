import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Field } from 'src/field/entities/field.entity';

export type RessourceDcoument = Ressource & Document;
@Schema()
export class Ressource {
  @Prop({ required: false })
  title: string;
  @Prop({ required: false })
  detail: string;
  @Prop({ required: false })
  type: string;
  @Prop({ required: true })
  uri: string;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Field',
  })
  @Type(() => Field)
  field: Field;
}

export const RessourceSchema = SchemaFactory.createForClass(Ressource);
