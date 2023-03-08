import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type OptionDocument = Option & Document;

@Schema()
export class Option {
  @Prop({ required: true })
  name: string;
}
export const OptionSchema = SchemaFactory.createForClass(Option);
