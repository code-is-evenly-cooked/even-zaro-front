export interface APISuccessResponse<T> {
  message: string;
  data: T;
}

export interface APIErrorResponse {
  status: number;
  message: string;
}

export type APIResponse<T> = APISuccessResponse<T> | APIErrorResponse;
