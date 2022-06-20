import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Joi from "joi";

import { generateToken } from "../utils/jwt.utils";
import { User } from "../entities/User";

export const register = async (req: Request, res: Response) => {
  let token = "";
  const schema = Joi.object({
    firstName: Joi.string().alphanum().min(3).max(10).required(),
    lastName: Joi.string().alphanum().min(3).max(10).required(),
    age: Joi.number().required(),
    bloodGroup: Joi.string().min(1).max(3).required(),
    address: Joi.string().alphanum().min(5).max(100).required(),
    location: Joi.string().alphanum().required(),
    phone: Joi.number().required(),
    activeDonor: Joi.boolean().optional(),
  });

  try {
    const value = await schema.validateAsync(req.body);
    const userRepository = getRepository(User);

    try {
      const user = await userRepository.findOne({
        where: {
          phone: req.body.phone,
          verified: true,
          register_complete: false,
        },
      });

      console.log(user);
      if (user) {
        userRepository.merge(user, {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          age: parseInt(req.body.age),
          bloodGroup: req.body.bloodGroup,
          activeDonor: req.body.activeDonor,
          address: req.body.address,
          location: req.body.location,
          verified: true,
          register_complete: true,
        });
        const results = await userRepository.save(user);

        // Generate user token
        token = generateToken(user);
      } else {
        return res.status(401).json({
          error: "Cannot register user. User already exists or phone not verified",
        });
      }
    } catch (err) {}
  } catch (err) {
    return res.status(422).json({
      error: err,
    });
  }

  return res.status(201).json({
    message: "User created",
    token,
  });
};

export const getUser = async (req: Request, res: Response) => {
  const schema = Joi.object({
    phone: Joi.number().required(),
  });

  try {
    const value = await schema.validateAsync(req.params);
    const userRepository = getRepository(User);

    if (!req.params.phone) {
      return res.status(500).json({
        error: "You must pass phone number",
      });
    }
    const user = await userRepository.findOne({
      where: {
        phone: parseInt(req.params.phone),
      },
    });

    if (user) {
      return res.status(200).json({
        message: {
          user,
        },
      });
    }
  } catch (err) {
    return res.status(422).json({
      error: err,
    });
  }
  res.status(404).json({
    message: "No user found",
  });
};

export const registerPhone = async (req: Request, res: Response) => {
  const schema = Joi.object({
    phone: Joi.number().required(),
  });

  try {
    const value = await schema.validateAsync(req.body);
    const userRepository = getRepository(User);
    if (!req.body.phone) {
      return res.status(422).json({
        error: "You have to pass phone number",
      });
    }
    try {
      const userStatus = await userRepository.findOne({
        where: {
          phone: req.body.phone,
        },
      });

      if (userStatus) {
        return res.status(200).json({
          message: "Phone number already exists",
        });
      }
      const code = Math.floor(Math.random() * 999999);
      console.log(code);
      const user = userRepository.create({
        firstName: "",
        lastName: "",
        age: 0,
        bloodGroup: "",
        activeDonor: false,
        address: "",
        location: "",
        phone: req.body.phone,
        verified: false,
        code: code,
        register_complete: false,
      });
      const results = await userRepository.save(user);
      console.log(results);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: "Server error 1",
      });
    }
  } catch (err) {
    return res.status(422).json({
      error: err,
    });
  }

  res.status(201).json({
    message:
      "Phone registered. A verification code has been sent to your number",
  });
};

export const verifyPhone = async (req: Request, res: Response) => {
  const schema = Joi.object({
    code: Joi.number().required(),
  });

  try {
    const value = await schema.validateAsync(req.body);
    const pincode = req.body.code;
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: {
        code: parseInt(pincode),
      },
    });
    if (user) {
      userRepository.merge(user, {
        verified: true,
      });
      const results = await userRepository.save(user);
    } else throw new Error("Invalid code");
  } catch (err) {
    return res.status(422).json({
      error: err,
    });
  }
  res.status(200).json({
    message: "Phone number successfully verified",
  });
};
