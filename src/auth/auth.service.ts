import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Parent, ParentDocument } from 'src/parent/entities/parent.entity';
import { Student, StudentDocument } from 'src/student/entities/student.entity';
import { SignInDto } from './dto/signIn.dto';
import * as bcrypt from 'bcrypt';
import { CreateStudentDto } from 'src/student/dto/create-student.dto';
import { StudentService } from 'src/student/student.service';
import { CreateParentDto } from 'src/parent/dto/create-parent.dto';
import { ParentService } from 'src/parent/parent.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Student.name)
    private StudentModel: Model<StudentDocument>,
    @InjectModel(Parent.name)
    private ParentModel: Model<ParentDocument>,

    private studentService: StudentService,
    private parentService: ParentService,
    private jwtService: JwtService,
  ) {}

  async login(signInDto: SignInDto): Promise<any> {
    let user = await this.StudentModel.findOne({
      phoneNumber: signInDto.phoneNumber,
    }).catch((e) => e);

    if (!user) {
      user = await this.ParentModel.findOne({
        phoneNumber: signInDto.phoneNumber,
      }).catch((e) => e);

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
    }

    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      user.password,
    );

    if (isValidPassword) {
      const payload = { userId: user.id, phoneNumber: user.phoneNumber };
      const token = this.jwtService.sign(payload, {
        secret: process.env.TOKEN_SECRET,
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...newUser } = user._doc;

      return {
        success: true,
        data: {
          userInfo: newUser,
          token: `Bearer ${token}`,
        },
      };
    } else if (!isValidPassword) {
      throw new HttpException('incorect password', HttpStatus.UNAUTHORIZED);
    } else {
      throw new HttpException(
        'un probleme est survenu',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async signUpStudent(createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  async signUpParent(createParentDto: CreateParentDto) {
    return this.parentService.create(createParentDto);
  }
}
