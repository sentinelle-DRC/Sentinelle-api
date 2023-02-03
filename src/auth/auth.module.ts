import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.Strategy';
import { StudentModule } from 'src/student/student.module';
import { Model } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from 'src/student/entities/student.entity';
import { Parent, ParentSchema } from 'src/parent/entities/parent.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Student.name, schema: StudentSchema },
      { name: Parent.name, schema: ParentSchema },
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
    }),
    JwtModule.register({
      secret: process.env.TOKEN_URI,
      signOptions: {
        expiresIn: 3600,
      },
    }),
    StudentModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
