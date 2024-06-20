import mongoose from 'mongoose';
import TErrorSource, { tGenericErrorResponse } from '../interface/error';
// import TErrorSource from '../interface/error';

const handleCastError = (err: mongoose.Error.CastError):tGenericErrorResponse => {
const errorSources:TErrorSource[] =  [
    {
        path:err.path,
        message:err.message
    }
]
  const statusCode = 400;
  return {
    statusCode,
    message: 'Cast Error',
    errorSources,
  };
};


export default handleCastError

