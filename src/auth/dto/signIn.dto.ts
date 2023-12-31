import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  public phoneNumber: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  public password: string;

  // @IsNotEmpty()
  @IsString()
  public code: string;
}
