import { Module } from '@nestjs/common';
import { AbsenceService } from './absence.service';
import { AbsenceController } from './absence.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Absence, AbsenceSchema } from './entities/absence.entity';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Absence.name,
        schema: AbsenceSchema,
      },
    ]),
    StudentModule,
  ],
  providers: [AbsenceService],
  controllers: [AbsenceController],
  exports: [AbsenceService],
})
export class AbsenceModule {}
