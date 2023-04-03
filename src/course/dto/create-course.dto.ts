import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({
    type: String,
    description: " l'id du la filière du cours",
  })
  @IsNotEmpty()
  @IsString()
  field: string;
}
