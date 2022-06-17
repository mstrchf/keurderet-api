import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { User } from "../entities/User";

export const register = async (req: Request, res: Response) => {
  const userRepository = getRepository(User);

  if (Object.keys(req.body).length < 1) {
    return res.status(403).json({
      message: "Illegal data passed",
    });
  }

  if (Object.keys(req.body).length === 1) {
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
      });
      const results = await userRepository.save(user);
      console.log(results);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: "Server error 1",
      });
    }
  } else {
    try {
      const user = await userRepository.findOne({
        where: {
          phone: req.body.phone,
          verified: true,
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
        });
        const results = await userRepository.save(user);
        console.log(results);
      } else {
        return res.status(401).json({
          error: "User phone number not verified",
        });
      }
    } catch (err) {}
  }

  return res.status(201).json({
    message: "User created",
  });
};

export const get = async (req: Request, res: Response) => {
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
  res.status(404).json({
    message: "No user found",
  });
};

export const verifyPhone = async (req: Request, res: Response) => {
	const pincode = req.body.code;
	const userRepository = getRepository(User);

	const user = userRepository.findOne({
		where:{
			phone: parseInt(pincode)
		},
	})

	res.status(200).json({
		message: "Phone number successfully verified"
	})

	res.status(401).json({
		error: "Phone verification error"
	})
}
