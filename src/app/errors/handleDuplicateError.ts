
import TErrorSource, { tGenericErrorResponse } from '../interface/error';
// import TErrorSource from '../interface/error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (err :any):tGenericErrorResponse => {
    const match =  err.message.match(/"([^*]*)"/)
    const extractedMessage = match && match[1]
const errorSources:TErrorSource[] =  [
    {
        path:'',
        message:`${extractedMessage} is already exist`
    }
]
  const statusCode = 400;
  return {
    statusCode,
    message: 'Cast Error',
    errorSources,
  };
};


export default handleDuplicateError

