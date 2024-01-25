import { ErrorExpanded, ErrorMassageFromStatuse } from "types/types";

const errorMessageList: ErrorMassageFromStatuse = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not found",
  409: "Conflict",
};

export const HttpError = (
  status: number = 400,
  message = errorMessageList[status]
) => {
  const error = new Error(message) as ErrorExpanded;
  error.status = status;
  return error;
};


