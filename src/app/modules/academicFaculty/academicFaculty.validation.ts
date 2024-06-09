import { z } from "zod";

export const AcademicFacultyValidation = z.object({
    name:z.string({
        invalid_type_error:"Academic Faculty must be a string"
    })
})