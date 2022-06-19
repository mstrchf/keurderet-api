import { Request, Response } from "express";
import jwt from "jsonwebtoken";
const SECRET = "somesecret"
type User =  {
    firstName: string;
    lastName: string;
    phone: number
}

export const generateToken = (user: User) => {
  const payload = {
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
  };
  // create token
  const token = jwt.sign(payload, SECRET, {
    expiresIn: "8760h",
  });

  return token;
};

export const verifyToken = (req: Request, res:Response) => {
  let decoded: any;
  const token = req.headers["X-Access-Token"] as string;
  if (!token) {
    return res.status(403).json({
      message: "A token is required",
    });
  }
  try {
    decoded = jwt.verify(token, SECRET);
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
  return decoded;
};
