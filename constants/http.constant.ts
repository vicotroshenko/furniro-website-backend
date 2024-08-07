export enum ErrorStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
}

export enum ErrorMessage {
  OK = "Ok",
  CREATED = "Created",
  BAD_REQUEST = "Bad Request",
  UNAUTHORIZED = "Unauthorized",
  FORBIDDEN = "Forbidden",
  NOT_FOUND = "Not found",
  CONFLICT = "Conflict",
  DELETED = "Item was deleted",
  MISSING_FIELD = "missing required name field",
}
