import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';
import { NextFunction, Request, RequestHandler, Response } from 'express';

const ValidationMiddleWar = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const zodParsedData = await schema.parseAsync({
      body: req.body,
    });
    next();
  });
};

export default ValidationMiddleWar;
