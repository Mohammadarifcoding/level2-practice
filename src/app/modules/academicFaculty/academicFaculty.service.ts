import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFacultyModel } from "./academicFaculty.model";

const createAcademicFacultytoDb = async (payLoad: TAcademicFaculty) => {

    const result = await AcademicFacultyModel.create(payLoad);
  
    return result;
  };
  
  
  const getAcademicFacultyFromDb = async()=>{
      const result = await AcademicFacultyModel.find()
      return result
  }
  const getAcademicFacultyByIdFromDb = async(id :string)=>{
      const result = await AcademicFacultyModel.findById({_id : id})
      return result
  }
  const updateAcademicFacultyFromDb = async(id:string,payLoad:Partial<TAcademicFaculty>)=>{
  
    const result = await AcademicFacultyModel.findOneAndUpdate({_id : id},payLoad, {new : true})
    return result
     
  }
  export const AcademicFacultyService = {
    createAcademicFacultytoDb,
    getAcademicFacultyFromDb,
    getAcademicFacultyByIdFromDb,
    updateAcademicFacultyFromDb
  };
  