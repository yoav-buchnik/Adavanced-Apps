import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from "../config/config";
import mongoose from "mongoose";
import { User } from "../models/user";
import { userInfo } from "os";



const register = async (req: Request, res: Response, next): Promise<void> => {
  const email = req.body.email
  const username = req.body.username
  const password = req.body.password

  if (!email || !password || !username) {
    res.status(config.statusCode.BAD_REQUEST).json("Incomplete user data provided.");
    return;
  }

  try {
    const user = await User.findOne({ 'email': email })
    if (user) {
      res.status(config.statusCode.BAD_REQUEST).json("user already exist.");
      return;
    }
  } catch (error) {
    res.status(config.statusCode.INTERNAL_SERVER_ERROR).json((error as Error).message);
    return;
  }

  //create the user
  try {
    const salt = await bcrypt.genSalt(10)
    const encryptedPassword = await bcrypt.hash(password, salt)
    const user = new User({
      'email': email,
      'password': encryptedPassword,
      'username': req.body.username,
    })
    const newUser = await user.save()
    res.status(config.statusCode.SUCCESS).json(newUser);
  } catch (error) {
    res.status(config.statusCode.INTERNAL_SERVER_ERROR).json((error as Error).message);
  }
};

const login = async (req: Request, res: Response, next): Promise<void> => {
  console.log('login')
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    res.status(config.statusCode.BAD_REQUEST).json("Incomplete user data provided.");
  }
  try {
    const user = await User.findOne({ 'email': email });
    if (user == null) {
      res.status(config.statusCode.BAD_REQUEST).json("Bad email or password.");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(config.statusCode.BAD_REQUEST).json("Bad email or password.");
    }
    const accessToken = await jwt.sign(
      { '_id': user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.JWT_TOKEN_EXPIRATION }
    );
    const refreshToken = await jwt.sign(
      { '_id': user._id },
      process.env.REFRESH_TOKEN_SECRET
    );
    if (!user.tokens) {
      user.tokens = [refreshToken]
    }
    else {
      user.tokens.push(refreshToken)
    }
    await user.save()
    res.status(config.statusCode.SUCCESS).json({ 'accessToken': accessToken, 'refreshToken': refreshToken });
  } catch (error) {
    res.status(config.statusCode.INTERNAL_SERVER_ERROR).json((error as Error).message);
  }
};

const logout = async (req: Request, res: Response, next): Promise<void> => {
  console.log('logout')
  const authHeaders = req.headers['authorization']
  const token = authHeaders && authHeaders.split(' ')[1]
  if (!token) {
    res.status(config.statusCode.UNAUTHORIZED).json();
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, userInfo) => {
    if (err) {
      res.status(config.statusCode.FORBIDDEN).json(err.message);
    }
    const userId = userInfo._id
    try {
      const user = await User.findById(userId)
      if (!user) {
        res.status(config.statusCode.FORBIDDEN).json("invalid request");
      }
      if (!user.tokens.includes(token)) {
        user.tokens = [""]
        await user.save()
        res.status(config.statusCode.FORBIDDEN).json("invalid request");
      }
      user.tokens.splice(user.tokens.indexOf(token), 1)
      await user.save()
      res.status(config.statusCode.SUCCESS).json();
    } catch (err) {
      res.status(config.statusCode.FORBIDDEN).json((err as Error).message);
    }
  })
};

const refreshToken = async (req: Request, res: Response, next): Promise<void> => {
  console.log('refreshToken')
  const authHeaders = req.headers['authorization']
  const token = authHeaders && authHeaders.split(' ')[1]
  if (!token) {
    res.status(config.statusCode.UNAUTHORIZED).json();
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, userInfo) => {
    if (err) {
      res.status(config.statusCode.FORBIDDEN).json(err.message);
    }
    const userId = userInfo._id
    try {
      const user = await User.findById(userId)
      if (!user) {
        res.status(config.statusCode.FORBIDDEN).json("invalid request");
      }
      if (!user.tokens.includes(token)) {
        user.tokens = [""]
        await user.save()
        res.status(config.statusCode.FORBIDDEN).json("invalid request");
      }

      const accessToken = await jwt.sign(
        { '_id': user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.JWT_TOKEN_EXPIRATION }
      )
      const refreshToken = await jwt.sign(
        { '_id': user._id },
        process.env.REFRESH_TOKEN_SECRET
      )
      user.tokens[user.tokens.indexOf(token)] = refreshToken
      await user.save()
      res.status(config.statusCode.SUCCESS).json({ 'accessToken': accessToken, 'refreshToken': refreshToken });
    } catch (error) {
      res.status(config.statusCode.FORBIDDEN).json((error as Error).message);
    }
  })

};

export default {
  register,
  login,
  logout,
  refreshToken,
};
