import httpStatus from 'http-status';

import { NextFunction, Request, RequestHandler, Response } from 'express';
import sendResponse from '../../utils/sendResponse';

import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterService } from './academicSemister.service';

const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.createAcademicSemestertoDb(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is created succesfully',
    data: result,
  });
});


const getAcademicSemester : RequestHandler = catchAsync(async (req,res)=>{
  const result = await AcademicSemesterService.getAcademicSemesterFromDb()

  sendResponse(res , {
    statusCode : httpStatus.OK,
    success:true,
    message:'Academic Semester fetched Successfully',
    data: result
  })
})

const getAcademicSemesterById : RequestHandler = catchAsync(async (req,res)=>{
  const {id} = req.params
  const result = await AcademicSemesterService.getAcademicSemesterByIdFromDb(id)
 if(!result){
 return sendResponse(res , {
    statusCode : httpStatus.NOT_FOUND,
    success:true,
    message:"Couldn't found Academic Semester",
    data: result
  })
 }

  sendResponse(res , {
    statusCode : httpStatus.OK,
    success:true,
    message:'Academic Semester fetched by ID Successfully',
    data: result
  })
})

const updateAcademicSemester:RequestHandler = catchAsync(async(req,res)=>{
   const {id} = req.params
   const data = req.body
   const result = await AcademicSemesterService.updateAcademicSemesterFromDb(id,data)
   sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Academic Semester Updated Successfully',
    data:result
   })
})

export const AcademicSemesterController = {
  createAcademicSemester,
  getAcademicSemester,
  getAcademicSemesterById,
  updateAcademicSemester
};
