import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDb = async (payload:TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDb = async (query : Record<string, unknown>) => {
  const result = await Course.find(query);
  return result;
};

const getSingleCourseFromDb = async (id:string) => {
  const result = await Course.findById(id);
  return result;
};

const updateCourseFromDb = async (id: string, payload:TCourse) => {
  const result = await Course.findByIdAndUpdate(id, payload);
  return result;
};

const deleteCourseFromDb = async(id:string)=>{
    const result = await Course.findByIdAndUpdate(id,{isDeleted:true})
    return result
}


export const CourseServices = {
  createCourseIntoDb,
  getAllCoursesFromDb,
  getSingleCourseFromDb,
  updateCourseFromDb,deleteCourseFromDb
};
