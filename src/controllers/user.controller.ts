import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { User } from "../entities/User";

export const register = (req: Request, res: Response) => {
  if (Object.keys(req.body).length > 1) {
    return res.status(403).json({
      message: "Illegal data passed",
    });
  }

  const user = getRepository(User).find();

  return res.status(200).json({
    message: "Welcome home, Toby",
    user,
  });
};

export const get = (req: Request, res: Response) => {
  res.status(200).json({
    message: {
      name: "John Doe",
    },
  });
};
