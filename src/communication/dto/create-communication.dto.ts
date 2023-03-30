import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommunicationDto {
  @ApiProperty({
    type: String,
    description: 'Le titre du communiqué',
  })
  @IsNotEmpty()
  @IsString()
  title: String;

  @ApiProperty({
    type: String,
    description: 'Le contenu duu communiqué',
  })
  @IsNotEmpty()
  @IsString()
  content: String;

  @ApiProperty({
    type: String,
    description: "Le lien de l'image de couverture",
  })
  @IsString()
  cover: String;

  @ApiProperty({
    type: String,
    description: "L'id de la classe",
  })
  @IsNotEmpty()
  @IsString()
  class: String;
}
