export interface APISuccessResponse<T> {
  message: string;
  data: T;
}

export interface APIErrorResponseParams {
  code: string;
  message?: string;
  statusCode?: number;
}

export class APIErrorResponse extends Error {
  code: string;
  statusCode: number;

  constructor({
    code,
    message = "API Error",
    statusCode = 500,
  }: APIErrorResponseParams) {
    super(message);

    this.name = "APIErrorResponse";
    this.code = code;
    this.statusCode = statusCode;

    // Error 상속 문제 해결 (TS + Babel + Node 호환)
    Object.setPrototypeOf(this, new.target.prototype);

    // Node.js stack trace 디버깅 지원
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export function isAPIErrorResponse(err: unknown): err is APIErrorResponse {
  return (
    err instanceof Object &&
    err instanceof Error &&
    "statusCode" in err &&
    "code" in err &&
    err.name === "APIErrorResponse"
  );
}

export type APIResponse<T> = APISuccessResponse<T> | APIErrorResponse;
