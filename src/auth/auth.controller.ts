import { Body, Controller, Get, Post } from '@nestjs/common';
import { StudentService } from 'src/student/student.service';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';

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
}
