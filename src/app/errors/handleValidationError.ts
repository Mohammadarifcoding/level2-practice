import mongoose from 'mongoose';
import TErrorSource, { tGenericErrorResponse } from '../interface/error';
// import TErrorSource from '../interface/error';

const handleMongooseError = (err: mongoose.Error.ValidationError):tGenericErrorResponse => {
  const errorSources:TErrorSource[] = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) =>  {
        return {
            path:val.path,
            message:val.message
        }
    }
  );
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation error',
    errorSources,
  };
};


export default handleMongooseError