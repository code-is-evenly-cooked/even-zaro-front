import { APIErrorResponse } from "./api";
import "@tanstack/react-query";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: APIErrorResponse;
  }
}
