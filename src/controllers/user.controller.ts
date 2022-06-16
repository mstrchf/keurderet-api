import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { User } from "../entities/User";

export const register = async (req: Request, res: Response) => {
  const userRepository = getRepository(User);

  if (Object.keys(req.body).length < 1 || Object.keys(req.body).length > 7) {
    return res.status(403).json({
      message: "Illegal data passed",
    });
  }

  if (Object.keys(req.body).length === 1) {
    try {
      const user = userRepository.create({
        firstName: "",
        lastName: "",
        age: 0,
        bloodGroup: "",
        activeDonor: false,
        address: "",
        location: "",
        phone: 0,
        verified: false,
      });
      const results = await userRepository.save(user);
      console.log(results);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: "Server error",
      });
    }
  } else {
    try {
      const user = await userRepository.findOne(req.body.phone);
      if (user) {
        userRepository.merge(user, {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          age: parseInt(req.body.age),
          bloodGroup: req.body.bloodGroup,
          activeDonor: req.body.activeDonor,
          address: req.body.address,
          location: req.body.location,
          phone: parseInt(req.body.phone),
          verified: true,
        });

        const results = await userRepository.save(user);
        console.log(results);
      }
    } catch (err) {}
  }

  return res.status(201).json({
    message: "User created",
  });
};

export const get = (req: Request, res: Response) => {
  res.status(200).json({
    message: {
      name: "John Doe",
    },
  });
};
