import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateFieldDto {
  @ApiProperty({
    type: String,
    description: 'Le nom de la branche (ex: Français ou Anglais)',
  })
  @IsNotEmpty()
  @IsString()
  public name: string;
}
