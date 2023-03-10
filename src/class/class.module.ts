import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Class, ClassSchema } from './entities/class.entity';
import { SchoolModule } from 'src/school/school.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Class.name, schema: ClassSchema }]),
    SchoolModule,
  ],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
