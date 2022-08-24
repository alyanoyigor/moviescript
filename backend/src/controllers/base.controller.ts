import { Response } from 'express';
import { z as zod } from 'zod';
import {
  formatErrorResponse,
  formatSuccessResponse,
} from '../services/http.service';

class BaseController {
  formatSuccessResponse<T>(response: Response, data: T) {
    return formatSuccessResponse(response, data);
  }

  formatErrorResponse<T>(response: Response, error: T) {
    return formatErrorResponse(response, error);
  }

  handleError<T>(response: Response, error: T) {
    if (error instanceof zod.ZodError) {
      return this.formatErrorResponse(response, error.flatten());
    }

    if (error instanceof Error) {
      return this.formatErrorResponse(response, error.message);
    }
  }
}

export default BaseController;
