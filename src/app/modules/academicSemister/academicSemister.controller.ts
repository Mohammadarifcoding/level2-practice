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
export const AcademicSemesterController = {
  createAcademicSemester,
};
