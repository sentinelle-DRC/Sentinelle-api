import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { payloadInterface } from './payload.interface';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { StudentService } from 'src/student/student.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private studentService: StudentService, // @InjectModel(Student.name) // private studentModel: Model<StudentDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.TOKEN_SECRET,
    });
  }
  async validate(payload: payloadInterface) {
    console.log(payload);

    const user = await this.studentService.findOne(payload.userId);
    //  await this.studentModel.findOne({
    //   phoneNumber: payload.phoneNumber,
    // });

    if (user) {
      const { password, ...result } = user;
      return result;
    } else {
      throw new UnauthorizedException();
    }
    return null;
  }
}
