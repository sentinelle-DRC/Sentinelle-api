import { HttpException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose/dist/common';
import { Parent, ParentDocument } from './entities/parent.entity';
import * as bcrypt from 'bcrypt';
import { StudentService } from 'src/student/student.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ParentService {
  private saltOrRounds = 10;
  constructor(
    @InjectModel(Parent.name)
    private parentModel: Model<ParentDocument>,
    // @Inject(forwardRef(() => StudentService))
    private stuedntService: StudentService,
    private jwtService: JwtService,
  ) {}

  async create(createParentDto: CreateParentDto) {
    const password = createParentDto.password;
    const hash: string = await bcrypt
      .hash(password, this.saltOrRounds)
      .catch((e) => e);

    delete createParentDto.password;

    const parent = new this.parentModel({
      ...createParentDto,
      password: hash,
    });

    const newParent = await parent.save();

    const payload = {
      userId: newParent._id,
      phoneNumber: newParent.phoneNumber,
    };
    const token = this.jwtService.sign(payload, {
      secret: process.env.TOKEN_SECRET,
    });

    newParent.codes?.map(async (code) => {
      await this.stuedntService.GetIdParent(code, newParent._id);

      const id = await this.stuedntService.findBycode(code);
      await this.addStudent(newParent._id, id);
    });
    const parentSavved = await this.parentModel
      .findOne({ _id: newParent._id })
      .populate({
        path: 'students',
        populate: [
          { path: 'school', select: 'name' },
          {
            path: 'class',
            select: 'level',
            populate: {
              path: 'option',
              select: 'name',
            },
          },
          { path: 'notifications' },
          { path: 'results' },
          { path: 'absences' },
        ],
      });
    return {
      parent: parentSavved,
      token: `Bearer ${token}`,
    };
  }

  async findAll() {
    try {
      const listParent = await this.parentModel.find();
      if (listParent.length < 1) return 'Aucun parent trouvé';
      else {
        return listParent;
      }
    } catch (error) {
      return error.message;
    }
    // return await this.parentModel.find();
  }

  async findOne(id: mongoose.Schema.Types.ObjectId) {
    return await this.parentModel.findOne({ _id: id }).populate({
      path: 'students',
      populate: [
        { path: 'school', select: 'name' },
        {
          path: 'class',
          select: 'level',
          populate: {
            path: 'option',
            select: 'name',
          },
        },
        { path: 'notifications' },
        { path: 'results' },
        { path: 'absences' },
      ],
    });
  }

  //get parent by phone number for chatbot
  /**
   *
   * @param phoneNumber
   * @returns
   */
  async findParentByPhoneNumber(phoneNumber: string) {
    return await this.parentModel
      .findOne({ phoneNumber: phoneNumber })
      .populate({
        path: 'students',
        populate: [
          { path: 'school', select: 'name' },
          {
            path: 'class',
            select: 'level',
            populate: {
              path: 'option',
              select: 'name',
            },
          },
          { path: 'notifications' },
          { path: 'results' },
          { path: 'absences' },
        ],
      });
  }

  async update(
    id: mongoose.Schema.Types.ObjectId,
    updateParentDto: UpdateParentDto,
  ) {
    return await this.parentModel.updateOne({ _id: id }, { updateParentDto });
  }
  remove(id: number) {
    return `This action removes a #${id} parent`;
  }
  async addStudent(id: mongoose.Schema.Types.ObjectId, student: any) {
    const updatedSchool = await this.parentModel.updateOne(
      { _id: id },
      { $push: { students: student } },
    );
    return updatedSchool;
  }
  async addNewStudent(
    parentId: mongoose.Schema.Types.ObjectId,
    studentId: any,
  ) {
    try {
      const updatedSchool = await this.parentModel.updateOne(
        { _id: parentId },
        { $push: { students: studentId } },
      );
      return updatedSchool;
    } catch (error) {
      return error;
    }
  }
}
