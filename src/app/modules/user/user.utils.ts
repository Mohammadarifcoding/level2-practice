import { TAcademicSemester } from "../academicSemister/academicSemister.interface"
import { User } from "./user.model"

export const findLastStudentId = async()=>{
    const lastStudent = await User.findOne({
        role:'student'
    },
{
    id:1,
    _id : 0
}).sort({
    createdAt : -1
}).lean()
return lastStudent?.id 
}



export const generateStudentId = async(payload:TAcademicSemester)=>{
    // console.log(await findLastStudentId())
    let currentId =  (0).toString()
    const lastStudentId  = await findLastStudentId()
    const lastStudentSemesterCode = lastStudentId?.substring(4,6)
    const lastStudentYear = lastStudentId?.substring(0,4)
    const currentSemesterCode = payload.code ;
    const currentYear = payload.year
    console.log({lastStudentId,lastStudentSemesterCode,lastStudentYear,currentSemesterCode,currentYear})
  if(lastStudentId && lastStudentSemesterCode === currentSemesterCode && lastStudentYear === currentYear){
   currentId = lastStudentId.substring(6)
  }
    let incrementId = (Number(currentId)+1).toString().padStart(4,'0')
    console.log(incrementId)
    incrementId = `${payload.year}${payload.code}${incrementId}`
    return incrementId

}


