import ErrorCode from './ErrorCode';

type BadRequestRootType = {
  message: string;
  error_code: ErrorCode;
  name: string;
  errors: BadRequestRootType[];
};

type BadRequestType = BadRequestRootType[];

export default BadRequestType;
