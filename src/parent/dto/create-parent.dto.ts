import { ApiProperty } from '@nestjs/swagger';
import { IsEmailTidy } from '@nestjsi/class-validator';
import { IsNotEmpty, IsString, IsNumber, Length } from 'class-validator';

export class CreateParentDto {
  @ApiProperty({
    type: String,
    description: 'Numéro de téléphone congolais à 10 chiffres',
  })
  @IsString()
  @IsNotEmpty()
  @Length(10, 10, { message: 'Le numero doit être au format de 10 chiffres' })
  public phoneNumber: string;

  @ApiProperty({
    type: String,
  })
  // @IsEmailTidy()
  public email: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @ApiProperty({
    type: String,
    description: 'Doit être M ou F',
  })
  // @IsString()
  // @IsNotEmpty()
  // @Length(1, 1, { message: 'sex can only be M or F' })
  public sex: string;

  @ApiProperty({
    type: String,
    description: 'le lien de la photo',
  })
  public profil: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  public password: string;
  @ApiProperty({
    description: 'list of codes students',
  })
  public codes: string[];

  @ApiProperty({
    description: 'verify the connectiion',
  })
  public isAlreadyConnected: boolean;

  @ApiProperty({
    description: 'pour connaitre de chaque enfant',
  })
  public childPosition: number;
}
