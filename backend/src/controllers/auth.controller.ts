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
    const { username, password, email } = req.body;

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
