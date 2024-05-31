import { z } from 'zod';
import { AcademicSemesterName } from './academicSemiste.constant';
import { TAcademicSemisterName } from './academicSemister.interface';

const createAcamdemicSemesterValidaiton = z.object({
 body:z.object({
    name:z.enum([...AcademicSemesterName] as [string, ...string[]]),
    year : z.date(),
    

 })
});

export const AcademicValidation = {
 createAcamdemicSemesterValidaiton,
};
