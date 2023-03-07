import { ApiProperty } from '@nestjs/swagger';
import { IsEmailTidy } from '@nestjsi/class-validator';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSchoolDto {
  @ApiProperty({
    type: String,
    description: "Nom de l'ecole",
  })
  @IsString()
  @IsNotEmpty()
  public name: String;

  @ApiProperty({
    type: String,
    description: "addresse de l'ecole",
  })
  @IsString()
  @IsNotEmpty()
  public address: String;

  @ApiProperty({
    type: String,
    description: "Addresse email de l'ecole",
  })
  public email: String;

  @ApiProperty({
    type: String,
    description: 'Numéro de télephone de létablissement',
  })
  @IsString()
  @IsNotEmpty()
  public phoneNumber: String;
}
