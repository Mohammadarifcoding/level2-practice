import {
  TAcademicSemesterNameCodeMapper,
  TAcademicSemisterCode,
  TAcademicSemisterName,
  TMonth,
} from './academicSemister.interface';

export const AcademicSemesterName: TAcademicSemisterName[] = [
  'Autumn',
  'Summar',
  'Fall',
];
export const AcademicSemesterCode: TAcademicSemisterCode[] = ['01', '02', '03'];

export const months: TMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const AcademicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
  Autumn: '01',
  Summar: '02',
  Fall: '03',
};
