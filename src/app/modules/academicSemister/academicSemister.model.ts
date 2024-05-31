import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { TAcademicSemester, TMonth } from './academicSemister.interface';

const months: TMonth[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
        type: String,
        required: true,
      },
    year: {
      type: Date,
      required: true,
    },

    startMonth: {
      type: String,
      enum: months,
    },
    endMonth: {
        type: String,
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

export const AcademicSemesterModle = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema);
