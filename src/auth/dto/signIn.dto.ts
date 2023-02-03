import { IsNotEmpty, IsString, IsNumber, Length } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  public phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  public password: string;
}
