import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import config from "../config/config";

const authenticate = async (req: Request, res: Response, next) => {
    try {
        const authHeaders = req.headers['authorization'];
        if (!authHeaders) {
            throw new Error('No authorization header');
        }

        const token = authHeaders.split(' ')[1];
        if (!token) {
            throw new Error('No token provided');
        }

        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.body.user = user;
        next();
    } catch (error) {
        if (error.message === 'No authorization header' || error.message === 'No token provided') {
            return res.status(config.statusCode.UNAUTHORIZED).json({ message: error.message });
        }
        return res.status(config.statusCode.FORBIDDEN).json({ message: error.message });
    }
}

export default authenticate;