import { Request, Response } from 'express';
import { ValidationError } from 'class-validator';

interface ResponseFormat {
  success?: boolean;
  error?: boolean;
  message?: string;
  data?: unknown;
  errorStack?: Error | ValidationError[];
}

type TypedResponse<T> = Omit<Response, 'json' | 'status'> & {
  json(data: T): TypedResponse<T>;
} & { status(code: number): TypedResponse<T> };

export type AppResponse = TypedResponse<ResponseFormat>;

export interface User {
  type: string;
  email?: string;
  username?: string;
  name?: string;
}

export interface DecodedData {
  user: User;
  token: string;
}

export interface AppRequest extends Request {
  decoded: DecodedData
}
