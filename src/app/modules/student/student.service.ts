import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import QueryBuilder from '../../builder/QueryBuilder';
import StudentSearchableFields from './student.constant';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // let searchTerm = '';

  // const queryObj = { ...query };

  //   if (query.searchTerm) {
  //     searchTerm = query.searchTerm as string;
  //   }

  //   const searchQuery = Student.find({
  //     $or: ['email', 'name.firstName', 'presentAddress'].map((field) => ({
  //       [field]: { $regex: searchTerm, $options: 'i' },
  //     })),
  //   });

  //   //  Filtering

  //   const excludeFields = ['searchTerm', 'page', 'sort', 'limit', 'fields'];

  //   excludeFields.forEach((el) => delete queryObj[el]);

  //   const filterQuery = searchQuery
  //     .find(queryObj)
  //     .populate('admissionSemester')
  //     .populate({
  //       path: 'academicDepartment',
  //       populate: {
  //         path: 'academicFaculty',
  //       },
  //     });
  //   let sort = '-createdAt';
  //   if (query.sort) {
  //     sort = query.sort as string;
  //   }
  //   // Sorting
  //   const sortQuery = filterQuery.sort(sort);

  //   let page = 1;
  //   let limit = 1;
  //   let skip = 0;
  //   if (query.page) {
  //     page = Number(query.page);
  //     skip = (page - 1) * limit;
  //   }
  //   if (query.limit) {
  //     limit = Number(query.limit) as number;
  //   }
  //   // Pagination
  //   const paginateQuery = sortQuery.skip(skip);
  // // Limiting
  //   const limitQuery =  paginateQuery.limit(limit);

  //   let fields = '-__v'
  //   if(query.fields){
  //     fields =(query.fields as string).split(',').join(' ')
  //   }

  //   // field query

  //   const fieldQuery = limitQuery.select(fields)

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(StudentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  /*
    guardain: {
      fatherOccupation:"Teacher"
    }

    guardian.fatherOccupation = Teacher

    name.firstName = 'Mezba'
    name.lastName = 'Abedin'
  */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }
  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student');
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
};
