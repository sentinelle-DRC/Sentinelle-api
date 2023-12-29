import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { payloadInterface } from './payload.interface';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { StudentService } from 'src/student/student.service';
import { ParentService } from 'src/parent/parent.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private studentService: StudentService, // @InjectModel(Student.name) // private studentModel: Model<StudentDocument>,
    private parentService: ParentService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.TOKEN_SECRET,
    });
  }
  async validate(payload: payloadInterface) {
    // console.log(payload);

    const student = await this.studentService.findOne(payload.userId);
    const parent = await this.parentService.findOne(payload.userId);
    const user = await this.userService.findOne(payload.userId);
    //  await this.studentModel.findOne({
    //   phoneNumber: payload.phoneNumber,
    // });

    if (student) {
      const { password, ...result } = student;
      return result;
    } else if (parent) {
      const { password, ...result } = parent;
      return result;
    } else if (user) {
      const { password, ...result } = user;
      return result;
    } else {
      throw new UnauthorizedException();
    }
    return null;
  }
}
