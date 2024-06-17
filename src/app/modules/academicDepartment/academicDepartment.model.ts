
import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import AppError from '../../errors/AppError';
const AcademicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name:{
        type:String,
        required:true,
        unique:true
    },
    academicFaculty:{
        type:Schema.Types.ObjectId,
        ref:'AcademicFaculty'
    }
  },
  {
    timestamps: true,
  },
);




AcademicDepartmentSchema.pre('save',async function(next){
  const isDepartMentExists = await AcademicDepartmentModel.findOne({name:this.name})
  if(isDepartMentExists){
   throw new AppError(404,'Department already exists')
  }
  next()
})

AcademicDepartmentSchema.pre('findOneAndUpdate',async function(next) {
   const query = this.getQuery()
   const isDepartMentExists = await AcademicDepartmentModel.findOne(query)
  if(!isDepartMentExists){
   throw new AppError(404,'Department already exists')
  }
  next()
})


export const AcademicDepartmentModel = model<TAcademicDepartment>('AcademicDepartment', AcademicDepartmentSchema);
