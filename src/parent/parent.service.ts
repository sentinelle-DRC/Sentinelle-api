import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose/dist/common';
import { Parent, ParentDocument } from './entities/parent.entity';

@Injectable()
export class ParentService {
  constructor(
    @InjectModel(Parent.name)
    private parentModel: Model<ParentDocument>
  ){}

  create(createParentDto: CreateParentDto) {
    const parent = new this.parentModel(createParentDto)
    return parent.save()
    .catch((e)=>{
      throw new HttpException(e,HttpStatus.BAD_REQUEST)
    })
  }

  findAll() {
    return `This action returns all parent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parent`;
  }

  update(id: number, updateParentDto: UpdateParentDto) {
    return `This action updates a #${id} parent`;
  }

  remove(id: number) {
    return `This action removes a #${id} parent`;
  }
}
