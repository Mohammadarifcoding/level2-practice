import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { RequestHandler } from "express";
import { CourseServices } from "./course.service";
const createCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.createCourseIntoDb(
      req.body,
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester is created succesfully',
      data: result,
    });
  });



const getSingleCourse = catchAsync(async (req, res) => {
    const { CourseId } = req.params;
    const result = await CourseServices.getSingleCourseFromDb(CourseId);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course is retrieved succesfully',
      data: result,
    });
  });
  
  const getAllCourses: RequestHandler = catchAsync(async (req, res) => {
    const result = await CourseServices.getAllCoursesFromDb(req.query);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course are retrieved succesfully',
      data: result,
    });
  });
  
  const updateCourse = catchAsync(async (req, res) => {
    const { CourseId } = req.params;
    const { Course } = req.body;
    const result = await CourseServices.updateCourseFromDb(CourseId, Course);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course is updated succesfully',
      data: result,
    });
  });
  
  const deleteCourse = catchAsync(async (req, res) => {
    const { CourseId } = req.params;
    const result = await CourseServices.deleteCourseFromDb(CourseId);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course is deleted succesfully',
      data: result,
    });
  });
  
  export const CourseControllers = {
    getAllCourses,
    getSingleCourse,
    deleteCourse,
    updateCourse,
    createCourse
  };
  