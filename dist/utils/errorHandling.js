"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportErrorMessage = void 0;
const customError_1 = require("./customError");
const checkErrorMessage = (error) => {
    return (error instanceof customError_1.ValidationError &&
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        'errorType' in error &&
        typeof error.message === 'string');
};
const otherErrorMessage = (error) => {
    console.error(error);
    return new customError_1.InternalServerError();
};
const getErrorMessage = (maybeError) => {
    if (checkErrorMessage(maybeError)) {
        console.error(maybeError);
        return maybeError;
    }
    else {
        return otherErrorMessage(maybeError);
    }
};
const reportErrorMessage = (error, res) => __awaiter(void 0, void 0, void 0, function* () {
    const err = getErrorMessage(error);
    const { message, statusCode, errorType } = err;
    return res.status(err.statusCode).json({
        message,
        errorType,
        statusCode,
    });
});
exports.reportErrorMessage = reportErrorMessage;
//# sourceMappingURL=errorHandling.js.map