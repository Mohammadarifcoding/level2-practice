
import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
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
   throw new Error('Department already exists')
  }
  next()
})

export const AcademicDepartmentModel = model<TAcademicDepartment>('AcademicDepartment', AcademicDepartmentSchema);
