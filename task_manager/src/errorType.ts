export interface ValidationError{
    data: {
        data: {
          errors: {
            msg: string;
          }[];
        }
      }
}
export interface ApiError {
  data: {
    message?: string;
  };
}