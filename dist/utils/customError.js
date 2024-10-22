"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchError = exports.UnauthorizedAccessError = exports.InvalidPropertyError = exports.NotFoundDataError = exports.DuplicatePropertyError = exports.PropertyRequiredError = exports.InternalServerError = exports.ValidationError = void 0;
class ValidationError extends Error {
    constructor(message, errorType, statusCode) {
        super();
        this.message = message;
        this.errorType = errorType;
        this.statusCode = statusCode;
    }
}
exports.ValidationError = ValidationError;
class InternalServerError extends ValidationError {
    constructor() {
        super('INTERNAL_SERVER_ERROR', 'INTERNAL_SERVER_ERROR', 500);
    }
}
exports.InternalServerError = InternalServerError;
class PropertyRequiredError extends ValidationError {
    constructor(message) {
        super(message, 'NO_PROPERTY', 400);
        this.message = message;
    }
}
exports.PropertyRequiredError = PropertyRequiredError;
class DuplicatePropertyError extends ValidationError {
    constructor(message) {
        super(message, 'DUPLICATE', 400);
        this.message = message;
    }
}
exports.DuplicatePropertyError = DuplicatePropertyError;
class NotFoundDataError extends ValidationError {
    constructor(message) {
        super(message, 'NOT_FOUND', 404);
        this.message = message;
    }
}
exports.NotFoundDataError = NotFoundDataError;
class InvalidPropertyError extends ValidationError {
    constructor(message) {
        super(message, 'INVALID', 400);
        this.message = message;
    }
}
exports.InvalidPropertyError = InvalidPropertyError;
class UnauthorizedAccessError extends ValidationError {
    constructor() {
        super('UNAUTHORIZED_ACCESS', 'UNAUTHORIZED_ACCESS', 401);
    }
}
exports.UnauthorizedAccessError = UnauthorizedAccessError;
class fetchError extends ValidationError {
    constructor(message) {
        super(message, 'FETCHERROR', 500);
        this.message = message;
    }
}
exports.fetchError = fetchError;
//# sourceMappingURL=customError.js.map