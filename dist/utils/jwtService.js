"use strict";
// // import { UnauthorizedAccessError } from './customError';
// // import { Request, Response, NextFunction } from 'express';
// // import { reportErrorMessage } from '../utils/errorHandling';
// // export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
// //     try {
// //         console.log('req.session =', req.session);
// //         if (req.session && req.session.isSignedIn) {
// //             req.user = {
// //                 id: req.session.userId,
// //                 isSignedIn: req.session.isSignedIn,
// //             };
// //             next();
// //         } else {
// //             throw new UnauthorizedAccessError(); // isAuth: false, authSuccess: false
// //         }
// //     } catch (err: unknown) {
// //         return reportErrorMessage(err, res);
// //     }
// // };
// import { Request } from 'express'
// import { UserController } from '../domain/user/userController'
// import jwt from 'jsonwebtoken'
// import { token } from 'morgan'
// export default class JwtService {
//     static getUserIdFromRequest = (req: Request): string | null => {
//         const token = this.extractTokenFromRequest(req)
//         if(!token) {
//             return null
//         }
//     }
//     const jwtPayload = this.decodeJWT(token)
//     return (jwtPayload as any)?._id || null
//     const decodeJWT = (token: string) => {
//         try {
//             const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY!)
//             return decodedToken
//         } catch {
//             return null
//         }
//     }
//     const createJWT = async (user: UserController): Promise<string> => {
//         const token = jwt.sign(
//             { _id: user._id },
//             process.env.JWT_SECRET_KEY!
//         )
//         return token
//     }
// }
//# sourceMappingURL=jwtService.js.map