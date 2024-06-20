import mongoose from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academicSemister/academicSemister.interface';
import { AcademicSemesterModle } from '../academicSemister/academicSemister.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';

  //set manually generated it
  // userData.id = '2030100001';


  const admissionSemester = await AcademicSemesterModle.findById(payload.admissionSemester)

   const session= await mongoose.startSession()
  try{
   session.startTransaction()
   userData.id = await generateStudentId(admissionSemester)
   // create a user
   const newUser = await User.create([userData],{session});
   
   //create a student
   if (!newUser.length) {
    throw new AppError(httpStatus.BAD_REQUEST,'Failed to create user')
   }
     // set id , _id as user
     payload.id = newUser[0].id;
     payload.user = newUser[0]._id; //reference _id
    console.log(payload)
     const newStudent = await Student.create([payload],{session});
     if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST,'Failed to create Student')
     }
   await  session.commitTransaction()
   await  session.endSession()
     console.log(payload)
    return newStudent[0];
   
  }
  catch(err){
    await  session.abortTransaction()
    await  session.endSession()
  }
 
};

export const UserServices = {
  createStudentIntoDB,
};
