import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'admissionDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'admissionDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession()
  try{
    session.startTransaction()
    const deleteStudent = await Student.findOneAndUpdate({ id }, { isDeleted: true }, {new : true , session});
    if(!deleteStudent){
      throw new AppError(httpStatus.BAD_REQUEST,"Couldn't delete student")
    }
    
    const deleteUser = await User.findOneAndUpdate({ id }, { isDeleted: true }, {new : true , session})
    if(!deleteUser){
      throw new AppError(httpStatus.BAD_REQUEST,"Couldn't delete User")
    }
    await session.commitTransaction()
    await session.endSession()
    return deleteStudent;
  }
  catch(err){
    await session.abortTransaction()
    await session.endSession()
  }
 
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
