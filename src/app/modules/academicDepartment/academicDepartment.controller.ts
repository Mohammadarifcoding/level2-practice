import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AcademicDepartmentService } from "./academicDepartment.service";



const createAcademicDepartment: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.createAcademicDepartmenttoDb(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department is created succesfully',
    data: result,
  });
});


const getAcademicDepartment : RequestHandler = catchAsync(async (req,res)=>{
  const result = await AcademicDepartmentService.getAcademicDepartmentFromDb()

  sendResponse(res , {
    statusCode : httpStatus.OK,
    success:true,
    message:'Academic Department fetched Successfully',
    data: result
  })
})

const getAcademicDepartmentById : RequestHandler = catchAsync(async (req,res)=>{
  const {id} = req.params
  const result = await AcademicDepartmentService.getAcademicDepartmentByIdFromDb(id)
 if(!result){
 return sendResponse(res , {
    statusCode : httpStatus.NOT_FOUND,
    success:true,
    message:"Couldn't found Academic Department",
    data: result
  })
 }

  sendResponse(res , {
    statusCode : httpStatus.OK,
    success:true,
    message:'Academic Department fetched by ID Successfully',
    data: result
  })
})

const updateAcademicDepartment:RequestHandler = catchAsync(async(req,res)=>{
   const {id} = req.params
   const data = req.body
   const result = await AcademicDepartmentService.updateAcademicDepartmentFromDb(id,data)
   sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Academic Department Updated Successfully',
    data:result
   })
})

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAcademicDepartment,
  getAcademicDepartmentById,
  updateAcademicDepartment
};
