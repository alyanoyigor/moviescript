import { Response } from 'express';
import { Error } from 'mongoose';

function formatResponse<T>(error: boolean, data: T) {
  return { error, data };
}

export function formatSuccessResponse<T>(res: Response, data: T) {
  return res.status(200).json(formatResponse(false, data));
}

export function formatErrorResponse<T>(res: Response, error: T) {
  return res.status(400).json(formatResponse(true, error));
}
