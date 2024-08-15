import jwt, { JwtPayload } from "jsonwebtoken";
import { getUserByIdDb } from "../domains/user.domain";
import throwNewError from "../error";
import { NextFunction, Request, Response } from "express";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.header("authorization");

    if (!header) {
      throwNewError("Unauthorized", 401);
    }

    const [_, token] = header.split(" ");

    const secret = process.env.JWT_SECRET;
    const verifiedToken = jwt.verify(token, secret) as JwtPayload;

    const foundUser = await getUserByIdDb(verifiedToken.userId);

    if (!foundUser) {
      throwNewError("No user found with provided ID", 404);
    }

    next();
  } catch (e) {
    return res
      .status(e.status ?? 500)
      .send({ error: e.message ?? "Invalid credentials" });
  }
};
