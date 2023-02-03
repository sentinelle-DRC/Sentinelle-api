import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Parent, ParentDocument } from 'src/parent/entities/parent.entity';
import { Student, StudentDocument } from 'src/student/entities/student.entity';
import { SignInDto } from './dto/signIn.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Student.name)
    private StudentModel: Model<StudentDocument>,
    @InjectModel(Parent.name)
    private ParentModel: Model<ParentDocument>,
    private jwtService: JwtService,
  ) {}

  async login(signInDto: SignInDto): Promise<Object> {
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

      console.log(token);

      // const { password, ...newuser } = user;
      console.log({ 'actual user': user });

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
}
