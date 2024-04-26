import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Result, ResultDocument } from './entities/result.entity';
import mongoose, { Model } from 'mongoose';
import { StudentService } from 'src/student/student.service';
import { WorkService } from 'src/work/work.service';
import { CreateResultDto } from './dto/create-result.dto';

@Injectable()
export class ResultService {
  constructor(
    @InjectModel(Result.name)
    private result: Model<ResultDocument>,
    private studentService: StudentService,
    private workservice: WorkService,
  ) {}
  async create(@Body() createResultDto: CreateResultDto) {
    try {
      const newResult = await this.result.create({ ...createResultDto });
      //add to student list
      await this.studentService.addResult(
        createResultDto.student,
        newResult._id,
      );
      //add to work list
      await this.workservice.addResult(createResultDto.work, newResult._id);
      return newResult;
    } catch (error) {
      return error;
    }
  }

  async findAllResult() {
    try {
      const listOfResult = await this.result.find();
      return listOfResult;
    } catch (error) {
      return error;
    }
  }
  //-----------------------for chat-----------------------------------------------------------------
  /**
   *
   * @param id l'id du student
   * @returns array of results for all courses
   */
  async findResultForAllCourseForOneStudentChat(
    id: mongoose.Schema.Types.ObjectId,
  ) {
    try {
      const listOfResult = await this.result
        .find({ student: id })
        .limit(5)
        .select(['cote', 'max'])
        .populate({
          path: 'work',
          select: ['title', 'about'],
          populate: [
            {
              path: 'course',
              select: ['field'],
              populate: [{ path: 'field', select: 'name' }],
            },
          ],
        });
      return listOfResult;
    } catch (error) {
      return error;
    }
  }
  //-----------------------for app-----------------------------------------------------------------
  /**
   *
   * @param id l'id du student
   * @returns array of results for all courses
   */
  async findResultForAllCourseForOneStudent(
    id: mongoose.Schema.Types.ObjectId,
  ) {
    try {
      const listOfResult = await this.result
        .find({ student: id })
        .select(['cote', 'max'])
        .populate({
          path: 'work',
          populate: [
            {
              path: 'course',
              populate: [
                {
                  path: 'field',
                },
              ],
            },
          ],
        });
      return listOfResult;
    } catch (error) {
      return error;
    }
  }

  /**
   *
   * @param id l'id du student
   * @returns array of results for all courses
   */
  async findResultForAllCourseForOneStudentByCourse(
    studentId: mongoose.Schema.Types.ObjectId,
    courseId: mongoose.Schema.Types.ObjectId,
  ) {
    try {
      const listOfResult = await this.result
        .find({ student: studentId })
        .populate({
          path: 'work',
          match: { course: courseId },
        });
      return listOfResult.filter((e) => e.work);
    } catch (error) {
      return error;
    }
  }

  async findAverageResultForAllCourseForOneStudent(id: string) {
    try {
      const newId = new mongoose.Types.ObjectId(id);
      const listOfResult = await this.result.aggregate([
        {
          $match: {
            student: newId,
          },
        },
        {
          $group: {
            _id: id,
            totalmax: { $sum: '$max' },
            totalCote: { $sum: '$cote' },
          },
        },
      ]);
      return (listOfResult[0].totalCote / listOfResult[0].totalmax) * 10;
    } catch (error) {
      return error;
    }
  }

  /**
   *
   * @param studentId id of the student
   * @param workId  id of the work
   * @returns  result
   */
  async findOneResult(
    studentId: mongoose.Schema.Types.ObjectId,
    workId: mongoose.Schema.Types.ObjectId,
  ) {
    try {
      const result = await this.result
        .findOne({
          $and: [{ student: studentId }, { work: workId }],
        })
        .select(['cote', 'max'])
        .populate({
          path: 'work',
          select: ['title', 'about'],
          populate: [
            {
              path: 'course',
              select: ['field'],
              populate: [{ path: 'field', select: 'name' }],
            },
          ],
        });
      return result;
    } catch (error) {
      return error;
    }
  }
  /**
   *
   * @param id id of the work
   * @returns
   */
  //   async findResultForAllStudentForOneCourse(
  //     id: mongoose.Schema.Types.ObjectId,
  //   ) {
  //     try {
  //       const listOfResult = await this.result
  //         .find({ work: id })
  //         .select(['cote', 'max'])
  //         .populate({
  //           path: 'work',
  //           select: ['title', 'about'],
  //           populate: [
  //             {
  //               path: 'course',
  //               select: ['field'],
  //               populate: [{ path: 'field', select: 'name' }],
  //             },
  //           ],
  //         });
  //       return listOfResult;
  //     } catch (error) {
  //       return error;
  //     }
  //   }
}
