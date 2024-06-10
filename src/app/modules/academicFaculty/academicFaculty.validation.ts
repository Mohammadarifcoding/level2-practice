import { z } from "zod";

export const createAcademicFacultyValidation = z.object({
    body:z.object({
        name:z.string()
    })
    
})


export const AcademicFacultyValidation = {
    createAcademicFacultyValidation
}