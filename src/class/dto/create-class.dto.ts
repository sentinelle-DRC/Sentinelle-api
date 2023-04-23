import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateClassDto {
  @ApiProperty({
    type: Number,
    description:
      "level correspond au niveau de la classe en sachant que la section primaire par exemple va du niveau 1 à 7, et les humanités ont 4 niveaux. ex: 3e primaire(niveau 3 de l'option primaire) et 2e Litt (niveau 2 de l'option littéraire), ",
  })
  @IsNotEmpty()
  @IsNumber()
  level: number;

  @ApiProperty({
    type: String,
    description:
      "l'id de l'option de la classe. le nom de l'optione par exemple , primaire, secondaire,commerciale ou Math physique",
  })
  @IsNotEmpty()
  @IsString()
  option: string;

  @ApiProperty({
    type: String,
    description: "l'id de l'école",
  })
  @IsNotEmpty()
  @IsString()
  school: string;
}
