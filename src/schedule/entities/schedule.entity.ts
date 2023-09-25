import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import mongoose from "mongoose";
import { Class } from "src/class/entities/class.entity";
import { Course } from "src/course/entities/course.entity";

export type ScheduleDocument = Schedule & Document;

@Schema()
export class Schedule {
    @Prop({required:true})
    day:String

    @Prop({required:true})
    startHour:String

    @Prop({required:true})
    endHour:String

    @Prop({required:true,type:mongoose.Schema.Types.ObjectId,ref:Course.name})
    @Type(()=>Course)
    course = mongoose.Schema.Types.ObjectId

    @Prop({required:true,type:mongoose.Schema.Types.ObjectId,ref:Class.name})
    @Type(()=>Class)
    class = mongoose.Schema.Types.ObjectId
}
 
export const ScheduleSchema = SchemaFactory.createForClass(Schedule)