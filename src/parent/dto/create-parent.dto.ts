import { IsEmailTidy } from '@nestjsi/class-validator';
import { IsNotEmpty,IsString,IsNumber,Length } from 'class-validator'

export class CreateParentDto {

    @IsString()
    @IsNotEmpty()
    @Length(10,10,{message:"Le numero doit être au format de 10 chiffres"})
    public phoneNumber:string;

    @IsEmailTidy()
    public email:string;

    @IsString()
    @IsNotEmpty()
    public firstName:string;

    @IsString()
    @IsNotEmpty()
    public lastName:string;

    @IsString()
    @IsNotEmpty()
    @Length(1,1,{message:"sex can only be M or F"})
    public sex:string;
}
