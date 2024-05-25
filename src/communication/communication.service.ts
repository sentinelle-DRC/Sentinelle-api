import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateCommunicationDto } from './dto/create-communication.dto';
import { UpdateCommunicationDto } from './dto/update-communication.dto';
import {
  Communication,
  CommunicationDocument,
} from './entities/communication.entity';
import { ClassService } from 'src/class/class.service';

@Injectable()
export class CommunicationService {
  constructor(
    @InjectModel(Communication.name)
    private CommunicationModel: Model<CommunicationDocument>,
    private classService: ClassService,
  ) {}
  async create(createCommunicationDto: CreateCommunicationDto) {
    const newCommunication = new this.CommunicationModel({
      ...createCommunicationDto,
    });
    //addintoClass
    await this.classService.addCommunication(
      createCommunicationDto.class,
      newCommunication._id,
    );

    return newCommunication.save();
  }

  async findAll() {
    const communications = await this.CommunicationModel.find();
    return communications;
  }
  async findByClass(id: mongoose.Schema.Types.ObjectId) {
    const communications = await this.CommunicationModel.find({
      class: id,
    }).populate({
      path: 'class',
      select: 'level',
      match: { _id: id },
      populate: {
        path: 'option',
        select: 'name',
      },
    });
    return communications;
  }
  async findOne(id: mongoose.Schema.Types.ObjectId) {
    return await this.CommunicationModel.findOne({
      _id: id,
    }).populate({
      path: 'class',
      // match: { _id: id },
    });
  }
  //find for cham with limit 5
  async findAllForChat() {
    try {
      const communications = await this.CommunicationModel.find()
        .limit(5)
        .populate({
          path: 'class',
          select: 'level',
          populate: {
            path: 'option',
            select: 'name',
          },
        });
      return communications;
    } catch (error) {
      return error;
    }
  }

  async findByClassForChat(id: mongoose.Schema.Types.ObjectId) {
    const communications = await this.CommunicationModel.find({
      class: id,
    })
      .limit(5)
      .populate({
        path: 'class',
        select: 'level',
        match: { _id: id },
        populate: {
          path: 'option',
          select: 'name',
        },
      });
    return communications;
  }

  async findOneForChat(id: mongoose.Schema.Types.ObjectId) {
    return await this.CommunicationModel.findOne({
      _id: id,
    })
      .limit(5)
      .populate({
        path: 'class',
        select: 'level',
        match: { _id: id },
        populate: {
          path: 'option',
          select: 'name',
        },
      });
  }

  update(id: number, updateCommunicationDto: UpdateCommunicationDto) {
    return `This action updates a #${id} communication`;
  }

  async remove(id: mongoose.Schema.Types.ObjectId) {
    return await this.CommunicationModel.deleteOne({ _id: id });
  }
}
