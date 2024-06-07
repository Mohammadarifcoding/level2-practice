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
return lastStudent?.id ? lastStudent.id.substring(6) : undefined
}



export const generateStudentId = async(payload:TAcademicSemester)=>{
    console.log(await findLastStudentId())
    const currentId = await findLastStudentId() || (0).toString()
    let incrementId = (Number(currentId)+1).toString().padStart(4,'0')
    console.log(incrementId)
    incrementId = `${payload.year}${payload.code}${incrementId}`
    return incrementId

}


