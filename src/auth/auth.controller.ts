import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateParentDto } from 'src/parent/dto/create-parent.dto';
import { CreateStudentDto } from 'src/student/dto/create-student.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/test')
  test() {
    return null;
  }

  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.login(signInDto);
  }

  // @Post('signup/student')
  // signUpStudent(@Body() createStudentDto: CreateStudentDto) {
  //   return this.authService.signUpStudent(createStudentDto);
  // }

  @Post('signup/parent')
  signUpParent(@Body() createParentDto: CreateParentDto) {
    return this.authService.signUpParent(createParentDto);
  }
  @Post('signup/user')
  signupUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUpUser(createUserDto);
  }
}
