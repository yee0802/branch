import { Request, Response } from "express";
import throwNewError from "../error";
import { getUserByUsernameDb } from "../domains/user.domain";

export const getUserByUsername = async (req: Request, res: Response) => {
  try {
    const username: string = req.params.username;

    const foundUser = await getUserByUsernameDb(username);

    if (!foundUser) {
      throwNewError("No user found with provided username", 404);
    }

    return res.status(200).send({ user: foundUser });
  } catch (err) {
    console.log("Error fetching user by username:", err.message);
    return res.status(err.status ?? 500).send({ error: err.message });
  }
};
