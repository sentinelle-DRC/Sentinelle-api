import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { ParentService } from './parent.service';
import { ParentController } from './parent.controller';
import { Parent, ParentSchema } from './entities/parent.entity';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Parent.name, schema: ParentSchema }]),
    // StudentModule,
    forwardRef(() => StudentModule),
  ],
  controllers: [ParentController],
  providers: [ParentService],
  exports: [ParentService],
})
export class ParentModule {}
