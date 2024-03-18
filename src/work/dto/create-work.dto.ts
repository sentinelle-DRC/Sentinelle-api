import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CreateWorkDto {
  @ApiProperty({
    type: String,
    description: '',
  })
  @IsNotEmpty()
  @IsString()
  title: string;
  @ApiProperty({
    type: String,
    description: '',
  })
  @IsNotEmpty()
  @IsString()
  about: string;

  @ApiProperty({
    type: String,
    description: " l'id du cours",
  })
  @IsNotEmpty()
  @IsString()
  course: mongoose.Schema.Types.ObjectId;
  @ApiProperty({
    type: String,
    description: 'List des resultats  pour cet eleve a un cours ',
  })
  public results: [{ type: mongoose.Schema.Types.ObjectId }];
  @ApiProperty({
    type: String,
    description: "l'id de classe",
  })
  public class: mongoose.Schema.Types.ObjectId;
  @ApiProperty({
    type: String,
    description: 'le max du travail',
  })
  public max: number;
}
