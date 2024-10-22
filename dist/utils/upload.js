"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
// aws s3 설정
const s3 = new client_s3_1.S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});
// multer-S3 설정
const upload = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3,
        bucket: 'dangsalon.com',
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + '-' + file.originalname);
        },
    }),
});
exports.default = upload;
//# sourceMappingURL=upload.js.map