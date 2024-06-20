type TErrorSource = {
    path: string | number;
    message: string;
  };


 export type tGenericErrorResponse = {
    statusCode : number,
    message: string,
    errorSources:TErrorSource[],
}

export default TErrorSource