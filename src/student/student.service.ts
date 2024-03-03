/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose/dist/common';
import { Student, StudentDocument } from './entities/student.entity';
import * as bcrypt from 'bcrypt';
import { SchoolService } from 'src/school/school.service';
// import { ParentService } from 'src/parent/parent.service';
import { ClassService } from 'src/class/class.service';

@Injectable()
export class StudentService {
  private saltOrRounds = 10;

  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<StudentDocument>,
    private schoolService: SchoolService,
    // private parentService: ParentService,
    private classService: ClassService,
  ) {}

  generateCode(): string {
    let code = '';
    const chaaracters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrsstuvwxyz0123456789';
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * chaaracters.length);
      code += chaaracters.charAt(randomIndex);
    }
    return code;
  }
  async create(createStudentDto: CreateStudentDto): Promise<any> {
    const password: string = this.generateCode();
    const hash: string = await bcrypt
      .hash(password, this.saltOrRounds)
      .catch((e) => e);

    delete createStudentDto.password;
    delete createStudentDto.code;
    delete createStudentDto.phoneNumber;

    const student = new this.studentModel({
      ...createStudentDto,
      password: hash,
      code: this.generateCode(),
      phoneNumber: password,
      parent: null,
    });

    // this.schoolService.addStudent
    const newStudent = await student.save();
    //adding to school
    await this.schoolService.addStudent(
      createStudentDto.school,
      newStudent._id,
    );
    //adding to Parent
    // await this.parentService.addStudent(
    //   createStudentDto.parent,
    //   newStudent._id,
    // );
    //adding to class
    await this.classService.addStudent(createStudentDto.class, newStudent._id);
    return {
      firstName: newStudent.firstName,
      lastName: newStudent.lastName,
      code: newStudent.code,
      password: newStudent.phoneNumber,
    };
    // return student.save().catch((e) => {
    //   throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    // });
  }

  async findAll() {
    try {
      return await this.studentModel
        .find()
        .populate({ path: 'school', select: 'name' })
        .populate({ path: 'class', select: 'name' })
        .populate({ path: 'parent', select: 'firstName' });
    } catch (error) {
      return error.message;
    }
  }

  async findOne(id: mongoose.Schema.Types.ObjectId): Promise<any> {
    try {
      const resultat = await this.studentModel
        .findOne({ _id: id })
        .populate({ path: 'school', select: 'name' })
        .populate({
          path: 'class',
          select: 'level',
          populate: {
            path: 'option',
            select: 'name',
          },
        })
        .populate({ path: 'parent' })
        .populate({ path: 'notifications' })
        .populate({ path: 'results' })
        .populate({ path: 'absences' });
      return resultat;
    } catch (error) {
      return error.message;
    }
  }
  async findByparent(id: mongoose.Schema.Types.ObjectId): Promise<any> {
    try {
      const resultat = await this.studentModel
        .find({ parent: id })
        .populate({ path: 'school', select: 'name' })
        .populate({
          path: 'class',
          select: 'level',
          populate: {
            path: 'option',
            select: 'name',
          },
        })
        .populate({ path: 'parent' })
        .populate({ path: 'notifications' })
        .populate({ path: 'results' })
        .populate({ path: 'absences' });
      return resultat;
    } catch (error) {
      return error.message;
    }
  }

  async findByClass(classId: mongoose.Schema.Types.ObjectId): Promise<any> {
    try {
      const resultat = await this.studentModel
        .find({ class: classId })
        .populate({ path: 'school', select: 'name' })
        // .populate({
        //   path: 'class',
        //   select: 'level',
        //   populate: {
        //     path: 'option',
        //     select: 'name',
        //   },
        // })
        .populate({ path: 'parent', select: 'firstName' })
        .populate({
          path: 'absences',
          select: 'date',
        });
      return resultat;
    } catch (error) {
      return error.message;
    }
  }

  update(
    id: mongoose.Schema.Types.ObjectId,
    updateStudentDto: UpdateStudentDto,
  ) {
    try {
      return this.studentModel.updateOne({ _id: id }, { updateStudentDto });
    } catch (error) {
      return error.message;
    }
  }

  async remove(id: mongoose.Schema.Types.ObjectId): Promise<string> {
    try {
      const result = await this.studentModel.deleteOne({ _id: id });
      if (result.deletedCount == 0) return 'impossible to remove';
      else return 'student removed successfully';
    } catch (error) {
      return error.message;
    }
  }
  async addNotification(id: mongoose.Schema.Types.ObjectId, notification: any) {
    return await this.studentModel.updateOne(
      { _id: id },
      { $push: { notifications: notification } },
    );
  }
  async addAbsence(id: mongoose.Schema.Types.ObjectId, absence: any) {
    return await this.studentModel.updateOne(
      { _id: id },
      { $push: { absences: absence } },
    );
  }
  async addResult(id: mongoose.Schema.Types.ObjectId, result: any) {
    return await this.studentModel.updateOne(
      { _id: id },
      { $push: { results: result } },
    );
  }
  //put id of parent
  async GetIdParent(code: string, id: mongoose.Schema.Types.ObjectId) {
    return await this.studentModel.findOneAndUpdate(
      { code: code },
      { parent: id },
    );
  }
  async findBycode(code: string) {
    const student = await this.studentModel.findOne({ code });
    return student._id;
  }
}
function populate(arg0: { path: string; select: string }) {
  throw new Error('Function not implemented.');
}
