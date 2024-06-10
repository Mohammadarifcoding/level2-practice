import { z } from 'zod';

export const createAcademicDepartmentValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic department must be a string',
      required_error: 'Name is required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic faculty must be  a string',
      required_error: 'Faculty is required',
    }),
  }),
});
export const updateAcademicDepartmentValidation = z.object({
    body: z.object({
      name: z.string({
        invalid_type_error: 'Academic department must be a string',
        required_error: 'Name is required',
      }).optional(),
      academicFaculty: z.string({
        invalid_type_error: 'Academic faculty must be  a string',
        required_error: 'Faculty is required',
      }).optional(),
    }),
  });
export const AcademicDepartmentValidation = {
  createAcademicDepartmentValidation,
  updateAcademicDepartmentValidation
};
