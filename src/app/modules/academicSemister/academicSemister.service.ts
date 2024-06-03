import { AcademicSemesterNameCodeMapper } from './academicSemiste.constant';
import {
  TAcademicSemester,
  TAcademicSemisterCode,
} from './academicSemister.interface';
import { AcademicSemesterModle } from './academicSemister.model';

const createAcademicSemestertoDb = async (payLoad: TAcademicSemester) => {
  if (AcademicSemesterNameCodeMapper[payLoad.name] !== payLoad.code) {
    throw new Error('Invalid Semester code');
  }
  const result = await AcademicSemesterModle.create(payLoad);

  return result;
};

export const AcademicSemesterService = {
  createAcademicSemestertoDb,
};
