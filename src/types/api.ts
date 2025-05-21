export interface APISuccessResponse<T> {
  message: string;
  data: T;
}

export class APIErrorResponse extends Error {
  code: string;
  statusCode: number;

  constructor({
    code,
    message,
    statusCode = 500,
  }: {
    code: string;
    message: string;
    statusCode?: number;
  }) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.name = "APIErrorResponse";
    // Error 상속 문제 방지
    Object.setPrototypeOf(this, APIErrorResponse.prototype);
  }
}

export type APIResponse<T> = APISuccessResponse<T> | APIErrorResponse;
