import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose/dist/common';
import { Student, StudentDocument } from './entities/student.entity';
import * as bcrypt from 'bcrypt';
import { SchoolService } from 'src/school/school.service';

@Injectable()
export class StudentService {
  private saltOrRounds = 10;

  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<StudentDocument>,
    private schoolService: SchoolService,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<any> {
    const password: string = createStudentDto.password;
    const hash: string = await bcrypt
      .hash(password, this.saltOrRounds)
      .catch((e) => e);

    delete createStudentDto.password;

    const student = new this.studentModel({
      ...createStudentDto,
      password: hash,
    });

    // this.schoolService.addStudent
    const newStudent = await student.save().catch((e) => {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    });

    const addtoSchool = await this.schoolService.addStudent(
      createStudentDto.school,
      newStudent._id,
    );
    return newStudent;
    // return student.save().catch((e) => {
    //   throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    // });
  }

  findAll() {
    return this.studentModel.find();
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
