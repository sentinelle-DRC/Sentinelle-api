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
import { User, UserSchema } from 'src/user/entites/user.entity';
import { SchoolModule } from 'src/school/school.module';
import { School, SchoolSchema } from 'src/school/entities/school.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Student.name, schema: StudentSchema },
      { name: Parent.name, schema: ParentSchema },
      { name: User.name, schema: UserSchema },
      { name: School.name, schema: SchoolSchema },
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
    SchoolModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, JwtStrategy],
})
export class AuthModule {}
