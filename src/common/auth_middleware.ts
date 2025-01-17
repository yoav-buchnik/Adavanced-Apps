import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import config from "../config/config";

const authenticate = async (req: Request, res: Response, next) => {
    const authHeaders = req.headers['authorization']
    const token = authHeaders && authHeaders.split(' ')[1]
    if (!token) {
        res.status(config.statusCode.UNAUTHORIZED).json();
    }
    else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                res.status(config.statusCode.FORBIDDEN).json(err.message);
            }
            req.body.user = user
            next()
        })
    }
}

export default authenticate;