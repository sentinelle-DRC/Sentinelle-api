import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { ParentService } from './parent.service';
import { ParentController } from './parent.controller';
import { Parent, ParentSchema } from './entities/parent.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Parent.name, schema: ParentSchema }]),
  ],
  controllers: [ParentController],
  providers: [ParentService],
  exports: [ParentService],
})
export class ParentModule {}
