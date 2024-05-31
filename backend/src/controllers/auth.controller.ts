import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import throwNewError from "../error";
import { Request, Response } from "express";
import {
  createUserDb,
  getUserByEmailDb,
  getUserByUsernameDb,
} from "../domains/user.domain";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const {
      username,
      password,
      email,
    }: { username: string; password: string; email: string } = req.body;

    if (!username || !password || !email) {
      throwNewError("Missing fields in request body", 400);
    }

    const emailIsDuplicate = await getUserByEmailDb(email);
    const usernameIsDuplicate = await getUserByUsernameDb(username);

    if (emailIsDuplicate || usernameIsDuplicate) {
      throwNewError(
        "A user with the provided username and/or email already exists",
        400
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const createdUser = await createUserDb(username, hashedPassword, email);

    return res.status(201).send({ user: createdUser });
  } catch (err) {
    console.log("Error registering user:", err.message);
    return res.status(err.status ?? 500).send({ error: err.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password }: { email: string; password: string } = req.body;

    if (!email || !password) {
      throwNewError("Missing fields in request body", 400);
    }

    const foundUser = await getUserByEmailDb(email);

    if (!foundUser) {
      throwNewError("Invalid email and/or password provided", 401);
    }

    const isPasswordValid = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordValid) {
      throwNewError("Invalid email and/or password provided", 401);
    }

    const secret = process.env.JWT_SECRET;
    const expiration = process.env.JWT_EXPIRES_IN;

    const token = jwt.sign({ userId: foundUser.id }, secret, {
      expiresIn: expiration,
    });

    return res.status(200).send({ token: token });
  } catch (err) {
    console.log("Error logging in user:", err.message);
    return res.status(err.status ?? 500).send({ error: err.message });
  }
};
