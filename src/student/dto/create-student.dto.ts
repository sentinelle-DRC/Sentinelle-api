import { IsNotEmpty, IsString, Length } from 'class-validator';
export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  @Length(10, 10, { message: 'Le numero doit être au format de 10 chiffres' })
  public phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @IsString()
  @IsNotEmpty()
  public middleName: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 1, { message: 'sex can only be M or F' })
  public sex: string;

  @IsString()
  @IsNotEmpty()
  public birthDate: string;

  @IsString()
  @IsNotEmpty()
  public nationality: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}
