import { NOT_FOUND_ERROR_STATUS_CODE } from '../constants/constants';

class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = NOT_FOUND_ERROR_STATUS_CODE;
  }
}

export default NotFoundError;
