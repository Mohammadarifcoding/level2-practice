import { z } from 'zod';
import { AcademicSemesterCode, AcademicSemesterName, months } from './academicSemiste.constant';
import { TAcademicSemisterName } from './academicSemister.interface';

const createAcamdemicSemesterValidaiton = z.object({
 body:z.object({
    name:z.enum([...AcademicSemesterName] as [string, ...string[]]),
    year : z.date(),
    code : z.enum([...AcademicSemesterCode as [string , ...string[]]]),
    startMonth : z.enum([...months] as [string , ...string[]]),
    endMonth : z.enum([...months] as [string , ...string[]])

 })
});

export const AcademicValidation = {
 createAcamdemicSemesterValidaiton,
};
