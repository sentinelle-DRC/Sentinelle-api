import { Connection } from "mongoose";
import { StudentSchema } from "./entities/student.entity";

export const studentProviders = [
    {
        provide:'STUDENT_MODEL',
        useFactory: (connection:Connection)=>connection.model('Student',StudentSchema),
        inject: ['DATABASE_CONNECTION'],
    }
]