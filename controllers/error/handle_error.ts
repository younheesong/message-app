import { NextApiResponse } from 'next';
import CustomServerError from './custom_server_error';

const handlerError = (err: unknown, res: NextApiResponse) => {
  let unknownError = err;
  if (err instanceof CustomServerError === false) {
    unknownError = new CustomServerError({ statusCode: 499, message: 'unknown error' });
  }
  const customError = unknownError as CustomServerError;
  res
    .status(customError.statusCode)
    .setHeader('location', customError.location ?? '')
    .send(customError.serializeErrors()); // error 응답에 body를 전달
};

export default handlerError;
