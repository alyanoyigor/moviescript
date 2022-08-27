import { Request, Response } from 'express';
import { Service } from 'typedi';
import AuthService from '../services/auth.service';
import { UserLoginSchema, UserRegisterSchema } from '../validation';
import BaseController from './base.controller';

@Service()
class AuthController extends BaseController {
  constructor(private authService: AuthService) {
    super();
  }

  async registerUser(request: Request, response: Response) {
    try {
      const validUser = UserRegisterSchema.parse(request.body);
      await this.authService.registerUser(validUser);
      const token = await this.authService.loginUser(request.body);
      return this.formatSuccessResponse(response, { token });
    } catch (error) {
      this.handleError(response, error);
    }
  }

  async login(request: Request, response: Response) {
    try {
      const validUser = UserLoginSchema.parse(request.body);
      const token = await this.authService.loginUser(validUser);
      return this.formatSuccessResponse(response, { token });
    } catch (error) {
      this.handleError(response, error);
    }
  }

  async logout(request: Request, response: Response) {
    try {
      if (request.context && request.context.user) {
        const user = await this.authService.logoutUser(request.context.user);
        return this.formatSuccessResponse(response, user);
      }
    } catch (error) {
      this.handleError(response, error);
    }
  }
}

export default AuthController;
