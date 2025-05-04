import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

interface UserPayload extends JwtPayload {
    userId: string;
}
const JWT_SECRET = process.env.JWT_SECRET;
const authJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    try {
        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
        req.userId = (decoded as UserPayload).userId;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token is not valid" })
    }
};

export default authJWT;