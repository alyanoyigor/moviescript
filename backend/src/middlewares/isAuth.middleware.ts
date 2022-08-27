import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';
import AuthService from '../services/auth.service';
import { formatErrorResponse } from '../services/http.service';

const isAuthMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (!request.context?.token) {
    return formatErrorResponse(response, 'No token provided');
  }

  try {
    const service = Container.get(AuthService);
    const token = request.context.token.slice(7);

    const decodedToken = service.verifyToken(token);
    const user = await service.findUserById(decodedToken.id);
    if (!user) {
      return formatErrorResponse(response, 'User not found');
    }
    if (user.token !== token) {
      return formatErrorResponse(response, 'Invalid token');
    }
    request.context = {
      ...request.context,
      user,
    };
    next();
  } catch (error) {
    return formatErrorResponse(response, 'Failed to authenticate token');
  }
};

export default isAuthMiddleware;
