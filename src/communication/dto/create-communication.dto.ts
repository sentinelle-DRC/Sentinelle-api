import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommunicationDto {
  @ApiProperty({
    type: String,
    description: 'Le titre du communiqué',
  })
  @IsNotEmpty()
  @IsString()
  public title: string;

  @ApiProperty({
    type: String,
    description: 'Le contenu duu communiqué',
  })
  @IsNotEmpty()
  @IsString()
  public content: string;

  @ApiProperty({
    type: String,
    description: "Le lien de l'image de couverture",
  })
  @IsString()
  public cover: string;

  @ApiProperty({
    type: String,
    description: "L'id de la classe",
  })
  @IsNotEmpty()
  @IsString()
  public class: string;
}
