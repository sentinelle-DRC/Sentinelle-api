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
import { User, UserDocument } from 'src/user/entites/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { School, SchoolDocument } from 'src/school/entities/school.entity';
import { SchoolService } from 'src/school/school.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Student.name)
    private StudentModel: Model<StudentDocument>,
    @InjectModel(Parent.name)
    private ParentModel: Model<ParentDocument>,
    @InjectModel(User.name)
    private UserModel: Model<UserDocument>,
    @InjectModel(School.name)
    private SchoolModel: Model<SchoolDocument>,

    private studentService: StudentService,
    private parentService: ParentService,
    private userService: UserService,
    private schoolService: SchoolService,
    private jwtService: JwtService,
  ) {}

  // async login(signInDto: SignInDto): Promise<any> {
  //   let user = await this.StudentModel.findOne({
  //     phoneNumber: signInDto.phoneNumber,
  //   }).catch((e) => e);

  //   if (!user) {
  //     user = await this.ParentModel.findOne({
  //       phoneNumber: signInDto.phoneNumber,
  //     }).catch((e) => e);

  //     if (!user) {
  //       user = await this.UserModel.findOne({
  //         phoneNumber: signInDto.phoneNumber,
  //       }).catch((e) => e);

  //       if (!user) {
  //         user = await this.StudentModel.findOne({
  //           code: signInDto.code,
  //         }).catch((e) => e);
  //         if (!user) {
  //           throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //         }
  //       }
  //     }
  //   }

  //   const isValidPassword = await bcrypt.compare(
  //     signInDto.password,
  //     user.password,
  //   );

  //   if (isValidPassword) {
  //     const payload = { userId: user.id, phoneNumber: user.phoneNumber };
  //     const token = this.jwtService.sign(payload, {
  //       secret: process.env.TOKEN_SECRET,
  //     });

  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     const { password, ...newUser } = user._doc;

  //     return {
  //       success: true,
  //       data: {
  //         userInfo: newUser,
  //         token: `Bearer ${token}`,
  //       },
  //     };
  //   } else if (!isValidPassword) {
  //     throw new HttpException('incorect password', HttpStatus.UNAUTHORIZED);
  //   } else {
  //     throw new HttpException(
  //       'un probleme est survenu',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  async loginParent(signInDto: SignInDto): Promise<any> {
    const user = await this.ParentModel.findOne({
      phoneNumber: signInDto.phoneNumber,
    }).catch((e) => e);

    if (!user) {
      throw new HttpException('Parent not found', HttpStatus.NOT_FOUND);
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
      const parent = await this.ParentModel.findOne({
        _id: newUser._id,
      }).populate({
        path: 'students',
        populate: [
          { path: 'school', select: 'name' },
          {
            path: 'class',
            select: 'level',
            populate: {
              path: 'option',
              select: 'name',
            },
          },
          { path: 'notifications' },
          { path: 'results' },
          { path: 'absences' },
        ],
      });

      return {
        success: true,
        data: {
          userInfo: parent,
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
  async loginUser(signInDto: SignInDto): Promise<any> {
    const user = await this.UserModel.findOne({
      phoneNumber: signInDto.phoneNumber,
    }).catch((e) => e);

    if (!user) {
      throw new HttpException(
        "Cet utilisateur n'est pas trouvé",
        HttpStatus.NOT_FOUND,
      );
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
      // const school = await this.ParentModel.findById(newUser.school);
      const userFound = await this.UserModel.findOne({
        _id: newUser._id,
      }).populate({
        path: 'school',
      });

      return {
        success: true,
        data: {
          userInfo: userFound,
          token: `Bearer ${token}`,
          message: 'connexion réussie',
          // school: ,
        },
      };
    } else if (!isValidPassword) {
      throw new HttpException(
        'Mot de passe incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    } else {
      throw new HttpException(
        'un probleme est survenu',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async loginStudent(signInDto: SignInDto): Promise<any> {
    if (!signInDto.code) {
      const user = await this.StudentModel.findOne({
        phoneNumber: signInDto.phoneNumber,
      }).catch((e) => e);
      if (!user) {
        throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
      } else {
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
              userInfo: newUser.populate('school'),
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
    } else if (!signInDto.phoneNumber) {
      const user = await this.StudentModel.findOne({
        code: signInDto.code,
      }).catch((e) => e);
      if (!user) {
        throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
      } else {
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
    } else return 'taper votre code ou numero';
  }

  async signUpParent(createParentDto: CreateParentDto) {
    return this.parentService.create(createParentDto);
  }
  async signUpUser(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  async verifyNumber(signInDto: SignInDto) {
    try {
      let user = await this.ParentModel.findOne({
        phoneNumber: signInDto.phoneNumber,
      });
      if (!user) {
        user = await this.StudentModel.findOne({
          phoneNumber: signInDto.phoneNumber,
        });
        if (!user) {
          user = await this.UserModel.findOne({
            phoneNumber: signInDto.phoneNumber,
          });
          if (!user) {
            return 'phoneNumber is never used';
          } else
            return new HttpException(
              'phonenumber already used',
              HttpStatus.CONFLICT,
            );
        } else
          return new HttpException(
            'phonenumber already used',
            HttpStatus.CONFLICT,
          );
      } else
        return new HttpException(
          'phonenumber already used',
          HttpStatus.CONFLICT,
        );
    } catch (error) {}
  }
}
