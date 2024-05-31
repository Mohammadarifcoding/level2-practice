export type TMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';
 

 export type TAcademicSemisterName = 'Autumn' | 'Summar' | 'Fall'
 export type TAcademicSemisterCode = '01' | '02' | '03'
export type TAcademicSemester = {
  name: TAcademicSemisterName;
  code: TAcademicSemisterCode;
  year: Date;
  startMonth: TMonth;
  endMonth: TMonth;
};
