import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';

import QueryBuilder from '../../builder/QueryBuilder';
import { Faculty } from './faculty.model';
import { FacultySearchableFields } from './facult.constant';
import { TFaculty } from './faculty.interface';
import { User } from '../user/user.model';

const getAllFacultysFromDB = async (query: Record<string, unknown>) => {
  const FacultyQuery = new QueryBuilder(
    Faculty.find().populate('academicDepartment'),
    query,
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await FacultyQuery.modelQuery;
  return result;
};

const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  return result;
};

const updateFacultyIntoDB = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainingFacultyData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingFacultyData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  const result = await Faculty.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteFacultyFromDB = async (id: string) => {
  //   const session = await mongoose.startSession();

  //   try {
  //     session.startTransaction();

  //     const deletedFaculty = await Faculty.findOneAndUpdate(
  //       { id },
  //       { isDeleted: true },
  //       { new: true, session },
  //     );

  //     if (!deletedFaculty) {
  //       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Faculty');
  //     }

  //     const deletedUser = await Faculty.findOneAndUpdate(
  //       { id },
  //       { isDeleted: true },
  //       { new: true, session },
  //     );

  //     if (!deletedUser) {
  //       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
  //     }

  //     await session.commitTransaction();
  //     await session.endSession();

  //     return deletedFaculty;
  //   } catch (err) {
  //     await session.abortTransaction();
  //     await session.endSession();
  //     throw new Error('Failed to delete Faculty');
  //   }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deletedFaculty = await Faculty.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, "Couldn't delete the faculty");
    }
    const deleteUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Couldn't delete the user");
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const FacultyServices = {
  getAllFacultysFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB,
  deleteFacultyFromDB,
};
