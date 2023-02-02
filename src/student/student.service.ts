import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose/dist/common';
import { Student, StudentDocument } from './entities/student.entity';

@Injectable()
export class StudentService {

  constructor(
    @InjectModel(Student.name)
    private studentModel  : Model<StudentDocument>
  ){}

  create(createStudentDto: CreateStudentDto):object{
    const student = new this.studentModel(createStudentDto)

    return student.save().catch((e) => {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    })
  }

  findAll() {
    return `This action returns all student`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
