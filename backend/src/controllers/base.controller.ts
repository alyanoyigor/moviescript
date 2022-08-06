import { Response } from 'express';
import {
  formatErrorResponse,
  formatSuccessResponse,
} from '../services/http.service';

class BaseController {
  formateSuccessResponse<T>(response: Response, data: T) {
    return formatSuccessResponse(response, data);
  }

  formatErrorResponse<T>(response: Response, error: T) {
    return formatErrorResponse(response, error);
  }
}

export default BaseController;
