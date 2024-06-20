/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import TErrorSource from '../interface/error';

const globalErrorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // setting values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!';


  let errorSources: TErrorSource[] = [
    {
      path: '',
      message: '',
    },
  ];

  const handleZodError = (err: ZodError) => {
    const errorSources:TErrorSource[] = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
         message : issue.message
      };
    });
    const statusCode = 400;
    return {
      statusCode,
      message: 'Validation error',
      errorSources,
    };
  };

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSources = simplifiedError.errorSources
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    error: err,
  });
};

export default globalErrorHandler;
