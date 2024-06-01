import {  TAcademicSemisterCode } from "./academicSemister.interface"
import { AcademicSemesterModle } from "./academicSemister.model"

const createAcademicSemestertoDb = async(payLoad : TAcademicSemisterCode)=>{
 const result  = await AcademicSemesterModle.create(payLoad);

 return result
}

export const AcademicSemesterService = {
    createAcademicSemestertoDb
}