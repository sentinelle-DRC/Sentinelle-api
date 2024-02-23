import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
export class CreateStudentDto {
  @ApiProperty({
    type: String,
    description: 'Numéro de téléphone congolais à 10 chiffres',
  })
  // @IsString()
  // @IsNotEmpty()
  // @Length(10, 10, { message: 'Le numero doit être au format de 10 chiffres' })
  public phoneNumber: string;

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
  })
  // @IsString()
  // @IsNotEmpty()
  public middleName: string;

  @ApiProperty({
    type: String,
    description:
      'code generé lors de la crétion du compte de letudiant par lecole',
  })
  // @IsString()
  // @IsNotEmpty()
  // @Length(10, 10, { message: 'Le numero doit être au format de 10 chiffres' })
  public code: string;

  @ApiProperty({
    type: String,
    description: 'Doit être soit M, soit F',
  })
  // @IsString()
  // @IsNotEmpty()
  // @Length(1, 1, { message: 'sex can only be M or F' })
  public sex: string;

  @ApiProperty({
    type: String,
  })
  // @IsString()
  // @IsNotEmpty()
  public birthDate: string;

  @ApiProperty({
    type: String,
  })
  public birthPlace: string;

  @ApiProperty({
    type: String,
  })
  // @IsString()
  // @IsNotEmpty()
  public nationality: string;

  @ApiProperty({
    type: String,
  })
  // @IsString()
  // @IsNotEmpty()
  public password: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  public school: mongoose.Schema.Types.ObjectId;
  // @IsString()
  // @IsNotEmpty()
  public parent: mongoose.Schema.Types.ObjectId;
  @ApiProperty({
    type: String,
    description: 'id de la class ',
  })
  @IsString()
  @IsNotEmpty()
  public class: mongoose.Schema.Types.ObjectId;
  @ApiProperty({
    type: String,
    description: 'List de notifs pour cet eleve',
  })
  public notifications: [{ type: mongoose.Schema.Types.ObjectId }];
  @ApiProperty({
    type: String,
    description: 'List des absences pour cet eleve',
  })
  public absences: [{ type: mongoose.Schema.Types.ObjectId }];
  @ApiProperty({
    type: String,
    description: 'List des resultats  pour cet eleve a un cours ',
  })
  public results: [{ type: mongoose.Schema.Types.ObjectId }];
  @ApiProperty({
    type: Boolean,
    description: 'abonnement du student',
  })
  public abonnement: boolean;
}
