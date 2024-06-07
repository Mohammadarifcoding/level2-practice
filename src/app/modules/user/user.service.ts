import config from '../../config';
import { TAcademicSemester } from '../academicSemister/academicSemister.interface';
import { AcademicSemesterModle } from '../academicSemister/academicSemister.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

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
  userData.id = await generateStudentId(admissionSemester)
  // create a user
  const newUser = await User.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    // set id , _id as user
    payload.id = newUser.id;
    payload.user = newUser._id; //reference _id
   console.log(payload)
    const newStudent = await Student.create(payload);
    console.log(payload)
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
