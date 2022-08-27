import { NextFunction, Request, Response } from 'express';

const accessTokenMiddleware = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  const token = request.headers['authorization'];
  if (token) {
    request.context = {
      token: String(token),
    };
  }
  next();
};

export default accessTokenMiddleware;
