import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose/dist/common';
import { Student, StudentDocument } from './entities/student.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentService {
  private saltOrRounds: number = 10;

  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<StudentDocument>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Object> {
    const password: string = createStudentDto.password;
    const hash: string = await bcrypt
      .hash(password, this.saltOrRounds)
      .catch((e) => e);

    delete createStudentDto.password;

    const student = new this.studentModel({
      ...createStudentDto,
      password: hash,
    });

    return student.save().catch((e) => {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    });
  }

  findAll() {
    return `This action returns all student`;
  }

  findOne(id: string): Promise<Student> | any {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
