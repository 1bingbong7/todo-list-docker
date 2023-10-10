class HttpError extends Error {
    static S = {
      BadRequest: 400, //validation errors / invalid signature
      Unauthorized: 401, //expired token, invalid token
      Forbidden: 403, //access denied
      NotFound: 404, //object not exists, method not exists, etc
      InternalServerError: 500, //logical errors
      DatabaseError: 501, //database errors
      UpstreamError: 503, //3rd party error
    }

    static PRE_MSG = {
      BadRequest: "Bad Request",
      Unauthorized: "Unauthorized",
      Forbidden: "Forbidden",
      NotFound: "Not Found",
      InternalServerError: "Internal Server Error",
      DatabaseError: "DB Transaction Error",
      UpstreamError: "Upstream Error",
    }
    constructor(statusCode, message, name) {
      let errorType = "", formattedMsg = "";
      super(message);
      this.statusCode = statusCode;
      this.name = name ?? 'HttpError'; // Set the name to the name of the error type (this is good for debugging)

      switch (statusCode) {

        case HttpError.S.BadRequest:
            errorType = HttpError.PRE_MSG.BadRequest;
            formattedMsg = `${HttpError.PRE_MSG.BadRequest}: ${message}`;
            break;

        case HttpError.S.Unauthorized:
            errorType = HttpError.PRE_MSG.Unauthorized;
            formattedMsg = `${HttpError.PRE_MSG.Unauthorized}: ${ (message)? message : "Access Denied" }`;
            break;

        case HttpError.S.Forbidden:
            errorType = HttpError.PRE_MSG.Forbidden;
            formattedMsg = `${HttpError.PRE_MSG.Forbidden}: ${ (message)? message : "Access to this resource is forbidden." }`;
            break;

        case HttpError.S.NotFound:
            errorType = HttpError.PRE_MSG.NotFound;
            formattedMsg = `${HttpError.PRE_MSG.NotFound}: ${ (message)? message : "The resource is not found." }`;
            break;

        case HttpError.S.InternalServerError:
            errorType = HttpError.PRE_MSG.InternalServerError;
            formattedMsg = `${HttpError.PRE_MSG.InternalServerError}: ${message}`;
            break;

        case HttpError.S.DatabaseError:
            errorType = HttpError.PRE_MSG.DatabaseError;
            formattedMsg = `${HttpError.PRE_MSG.DatabaseError}: ${message}`;
            break;

        case HttpError.S.UpstreamError:
            errorType = HttpError.PRE_MSG.UpstreamError;
            formattedMsg = `${HttpError.PRE_MSG.UpstreamError}: ${message}`;
            break;
    
        default:
            break;
      }

      this.message = formattedMsg;
      
      Error.captureStackTrace(this, this.constructor); // Capture stack trace
    }
}
module.exports = {
    HttpError
}
  