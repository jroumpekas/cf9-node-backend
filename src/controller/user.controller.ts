import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';

type EmailParams = {
  email: string;
};

type UsernameParams = {
  username: string;
};

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
};

export const getOneByEmail = async (
  req: Request<EmailParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.params.email;
    const result = await userService.findUserByEmail(email);

    if (!result) {
      return res.status(404).json({ message: 'User not found by email' });
    }

    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.createUser(req.body);
    return res.status(201).json({ status: true, data: user });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

export const update = async (
  req: Request<UsernameParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const username = req.params.username;
    const updatedUser = await userService.updateUser(username, req.body);

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(updatedUser);
  } catch (err) {
    return next(err);
  }
};