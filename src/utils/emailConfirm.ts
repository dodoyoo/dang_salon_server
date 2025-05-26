import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email: string, verification_token: string) => {
    const transporter = nodemailer.createTransport({
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

    await transporter.sendMail(mailOptions);
};
