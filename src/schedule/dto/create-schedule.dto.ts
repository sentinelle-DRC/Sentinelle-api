import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty,IsDate } from 'class-validator';
import mongoose from "mongoose";
import { isDate } from "util/types";

export class CreateScheduleDto {
    @ApiProperty(
        {
            type:String,
            description:"Jours de la semaine"
        }
    )
    @IsString()
    @IsNotEmpty()
    public day:String

    @ApiProperty({
        type:Date,
        description:"Heure de debut"
    })

    @IsString()
    @IsNotEmpty()
    public startHour:String


    @ApiProperty({
        type:Date,
        description:"Heure de fin"

    }) 

    @IsString()
    @IsNotEmpty()
    public endHour:String

    @ApiProperty({
        type:String,
        description:"Id du cours"
    })

    @IsNotEmpty()
    @IsString()
    public course : mongoose.Schema.Types.ObjectId;

    @ApiProperty({
        type:String,
        description:"Id de la classe"
    })

    @IsNotEmpty()
    @IsString()
    public class : mongoose.Schema.Types.ObjectId;
}
