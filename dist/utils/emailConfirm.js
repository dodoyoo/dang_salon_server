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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendVerificationEmail = (email, verification_token) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: 'smtp.naver.com',
        port: 465,
        secure: true,
        auth: {
            user: 'assad15903@naver.com',
            pass: 'tnwl941010',
        },
    });
    const mailOptions = {
        from: 'assad15903@naver.com',
        to: email,
        subject: '이메일 인증',
        text: `아래 링크를 클릭하여 이메일을 인증하세요: https://dangsalon.com/api/verify?token=${verification_token}`,
    };
    yield transporter.sendMail(mailOptions);
});
exports.sendVerificationEmail = sendVerificationEmail;
//# sourceMappingURL=emailConfirm.js.map