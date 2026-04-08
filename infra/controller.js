import { InternalServerError, MethodNotAllowedError } from "infra/errors";

export function onNoMatchHandler(req, res) {
  const publicErrorObject = new MethodNotAllowedError();
  res.status(405).json(publicErrorObject);
}

export function onErrorHandler(error, req, res) {
  const publicErrorObject = new InternalServerError({
    cause: error,
    statusCode: error.statusCode,
  });

  console.error(publicErrorObject);

  res.status(500).json(publicErrorObject);
}
