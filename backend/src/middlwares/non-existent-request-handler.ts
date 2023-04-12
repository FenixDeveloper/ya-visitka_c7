import { NotFoundError } from '../errors';
import ErrorMessages from '../helpers/error-messages';

const nonExistentRequestHandler = () => {
  throw new NotFoundError(ErrorMessages.NotFound);
};

export default nonExistentRequestHandler;
