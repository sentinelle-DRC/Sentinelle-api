import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Class, ClassSchema } from './entities/class.entity';
import { SchoolModule } from 'src/school/school.module';
import { OptionModule } from 'src/option/option.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Class.name, schema: ClassSchema }]),
    SchoolModule,
    OptionModule,
  ],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
