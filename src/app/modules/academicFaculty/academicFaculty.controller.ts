import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { AcademicFacultyService } from "./academicFaculty.service";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";


const createAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.createAcademicFacultytoDb(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty is created succesfully',
    data: result,
  });
});


const getAcademicFaculty : RequestHandler = catchAsync(async (req,res)=>{
  const result = await AcademicFacultyService.getAcademicFacultyFromDb()

  sendResponse(res , {
    statusCode : httpStatus.OK,
    success:true,
    message:'Academic Faculty fetched Successfully',
    data: result
  })
})

const getAcademicFacultyById : RequestHandler = catchAsync(async (req,res)=>{
  const {id} = req.params
  const result = await AcademicFacultyService.getAcademicFacultyByIdFromDb(id)
 if(!result){
 return sendResponse(res , {
    statusCode : httpStatus.NOT_FOUND,
    success:true,
    message:"Couldn't found Academic Faculty",
    data: result
  })
 }

  sendResponse(res , {
    statusCode : httpStatus.OK,
    success:true,
    message:'Academic Faculty fetched by ID Successfully',
    data: result
  })
})

const updateAcademicFaculty:RequestHandler = catchAsync(async(req,res)=>{
   const {id} = req.params
   const data = req.body
   const result = await AcademicFacultyService.updateAcademicFacultyFromDb(id,data)
   sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Academic Faculty Updated Successfully',
    data:result
   })
})

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAcademicFaculty,
  getAcademicFacultyById,
  updateAcademicFaculty
};
