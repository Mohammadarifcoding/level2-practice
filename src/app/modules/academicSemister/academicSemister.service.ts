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


const getAcademicSemesterFromDb = async()=>{
    const result = await AcademicSemesterModle.find()
    return result
}
const getAcademicSemesterByIdFromDb = async(id :string)=>{
    const result = await AcademicSemesterModle.findById({_id : id})
    return result
}
const updateAcademicSemesterFromDb = async(id:string,payLoad:Partial<TAcademicSemester>)=>{

 if(payLoad.name && payLoad.code && AcademicSemesterNameCodeMapper[payLoad.name] !== payLoad.code){
  throw new Error('Invalid Semester Code')
 }
  const result = await AcademicSemesterModle.findOneAndUpdate({_id : id},payLoad, {new : true})
  return result
   
}
export const AcademicSemesterService = {
  createAcademicSemestertoDb,
  getAcademicSemesterFromDb,
  getAcademicSemesterByIdFromDb,
  updateAcademicSemesterFromDb
};
