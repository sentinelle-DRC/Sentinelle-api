import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Absence, AbsenceDocument } from './entities/absence.entity';
import mongoose, { Model } from 'mongoose';
import { StudentService } from 'src/student/student.service';
import { CreateAbsenceDto } from './dto/create-absence.dto';

@Injectable()
export class AbsenceService {
  constructor(
    @InjectModel(Absence.name)
    private absence: Model<AbsenceDocument>,
    private studentService: StudentService,
  ) {}
  async create(createAbsenceDto: CreateAbsenceDto) {
    try {
      const newAbsence = await this.absence.create({
        ...createAbsenceDto,
      });
      //add to the student
      await this.studentService.addAbsence(
        createAbsenceDto.student,
        newAbsence._id,
      );
    } catch (error) {
      return error;
    }
  }

  //-----------------for chat--------------------------------------
  async findAllForChat() {
    try {
      const students = await this.absence.find().limit(5).populate({
        path: 'student',
        select: 'firstName',
      });
      return students;
    } catch (error) {
      return error;
    }
  }
  //by id of student please
  /**
   *
   * @param id {id of student}
   * @returns student object
   */
  async findOneForChat(id: mongoose.Schema.Types.ObjectId) {
    try {
      const student = await this.absence
        .findOne({ student: id })
        .limit(5)
        .populate({
          path: 'student',
          select: 'firstName',
        });
      return student;
    } catch (error) {
      return error;
    }
  }

  //-----------------for chat--------------------------------------

  async findAll() {
    try {
      const students = await this.absence.find();
      return students;
    } catch (error) {
      return error;
    }
  }
  //by id of student please
  /**
   *
   * @param id {id of student}
   * @returns student object
   */
  async findOne(id: mongoose.Schema.Types.ObjectId) {
    try {
      const student = await this.absence.findOne({ student: id });
      return student;
    } catch (error) {
      return error;
    }
  }
}
