import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateOptionDto {
  @ApiProperty({
    type: String,
    description:
      "le nom de l'optione par exemple , primaire, secondaire,commerciale ou Math physique",
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
