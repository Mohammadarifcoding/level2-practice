import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from './academicSemister.interface';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  months,
} from './academicSemiste.constant';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemesterName,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterCode,
    },
    year: {
      type: String,
      required: true,
    },

    startMonth: {
      type: String,
      required: true,
      enum: months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: months,
    },
  },
  {
    timestamps: true,
  },
);

// academicSemesterSchema.pre('save', async function (next) {
//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   const user = this; // doc
//   // hashing password and save into DB
//   user.password = await bcrypt.hash(
//     user.password,
//     Number(config.bcrypt_salt_rounds),
//   );
//   next();
// });

// // set '' after saving password
// academicSemesterSchema.post('save', function (doc, next) {
//   doc.password = '';
//   next();
// });
academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemesterModle.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemesterExists) {
    throw new Error('Semeste already exits');
  }
});
export const AcademicSemesterModle = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
