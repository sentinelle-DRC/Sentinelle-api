import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateRessourceDto {
  @ApiProperty({
    type: String,
    description: 'le titre de la ressource',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    type: String,
    description: 'plus de details sur la ressource',
  })
  @IsNotEmpty()
  @IsString()
  details: string;

  @ApiProperty({
    type: String,
    description:
      'le type de ressource, [pdf,video(book),external article(ext) ou video]',
  })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({
    type: String,
    description:
      'le niveau de la ressource par rapport aux élèves:[0(for all),1(pour ceux du primmaire),1(pour ceux des hummanités)]',
  })
  @IsNotEmpty()
  @IsString()
  level: number;

  @ApiProperty({
    type: String,
    description: 'le lien vers la ressouce',
  })
  @IsNotEmpty()
  @IsString()
  uri: string;

  @ApiProperty({
    type: String,
    description: "l'id de la matiere qui cadre avec la ressource",
  })
  @IsNotEmpty()
  @IsString()
  field: string;
}
