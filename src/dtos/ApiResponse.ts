import ErrorCode from '../errors/ErrorCode';

export default interface ApiResponse<T> {
  status: 'success' | 'error';
  message: string;
  error_code: ErrorCode;
  data: T;
}
