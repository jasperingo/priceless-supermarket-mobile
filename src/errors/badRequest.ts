import ErrorCode from './ErrorCode';

type BadRequestType = {
  message: string;
  error_code: ErrorCode;
  name: string;
  errors: BadRequestType[];
}[];

export default BadRequestType;
