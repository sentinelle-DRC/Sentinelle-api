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
}
