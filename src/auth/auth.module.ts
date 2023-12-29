import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.Strategy';
import { StudentModule } from 'src/student/student.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from 'src/student/entities/student.entity';
import { Parent, ParentSchema } from 'src/parent/entities/parent.entity';
import { ParentModule } from 'src/parent/parent.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Student.name, schema: StudentSchema },
      { name: Parent.name, schema: ParentSchema },
    ]),
    PassportModule,
    // PassportModule.register({
    //   defaultStrategy: 'jwt',
    //   session: false,
    // }),
    JwtModule.register({
      secret: process.env.TOKEN_SECRET,
      signOptions: {
        expiresIn: 3600,
      },
    }),
    StudentModule,
    ParentModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, JwtStrategy],
})
export class AuthModule {}
