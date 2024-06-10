import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartmentModel } from "./academicDepartment.model";


const createAcademicDepartmenttoDb = async (payLoad: TAcademicDepartment) => {

    const result = await AcademicDepartmentModel.create(payLoad);
  
    return result;
  };
  
  
  const getAcademicDepartmentFromDb = async()=>{
      const result = await AcademicDepartmentModel.find()
      return result
  }
  const getAcademicDepartmentByIdFromDb = async(id :string)=>{
      const result = await AcademicDepartmentModel.findById({_id : id})
      return result
  }
  const updateAcademicDepartmentFromDb = async(id:string,payLoad:Partial<TAcademicDepartment>)=>{
  
    const result = await AcademicDepartmentModel.findOneAndUpdate({_id : id},payLoad, {new : true})
    return result
     
  }
  export const AcademicDepartmentService = {
    createAcademicDepartmenttoDb,
    getAcademicDepartmentFromDb,
    getAcademicDepartmentByIdFromDb,
    updateAcademicDepartmentFromDb
  };
  