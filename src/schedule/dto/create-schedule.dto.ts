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

    @IsDate()
    @IsNotEmpty()
    public startHour:Date


    @ApiProperty({
        type:Date,
        description:"Heure de fin"

    }) 

    @IsDate()
    @IsNotEmpty()
    public endHour:Date

    @ApiProperty({
        type:String,
        description:"Id du cours"
    })

    @IsNotEmpty()
    @IsString()
    public cours = mongoose.Schema.Types.ObjectId;

    @ApiProperty({
        type:String,
        description:"Id de la classe"
    })

    @IsNotEmpty()
    @IsString()
    public class = mongoose.Schema.Types.ObjectId;
}
