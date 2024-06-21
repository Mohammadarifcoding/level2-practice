import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FacultyServices } from "./faculty.service";
import { RequestHandler } from "express";

const getSingleFaculty = catchAsync(async (req, res) => {
    const { FacultyId } = req.params;
    const result = await FacultyServices.getSingleFacultyFromDB(FacultyId);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty is retrieved succesfully',
      data: result,
    });
  });
  
  const getAllFacultys: RequestHandler = catchAsync(async (req, res) => {
    const result = await FacultyServices.getAllFacultysFromDB(req.query);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty are retrieved succesfully',
      data: result,
    });
  });
  
  const updateFaculty = catchAsync(async (req, res) => {
    const { FacultyId } = req.params;
    const { Faculty } = req.body;
    const result = await FacultyServices.updateFacultyIntoDB(FacultyId, Faculty);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty is updated succesfully',
      data: result,
    });
  });
  
  const deleteFaculty = catchAsync(async (req, res) => {
    const { FacultyId } = req.params;
    const result = await FacultyServices.deleteFacultyFromDB(FacultyId);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty is deleted succesfully',
      data: result,
    });
  });
  
  export const FacultyControllers = {
    getAllFacultys,
    getSingleFaculty,
    deleteFaculty,
    updateFaculty,
  };
  