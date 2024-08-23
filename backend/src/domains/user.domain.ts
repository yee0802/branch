import { UpdatedProfileData } from "../types/user.types";
import prisma from "../utils/prisma";

export const getUserByEmailDb = async (email: string) =>
  await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      username: true,
      password: true,
      email: true,
    },
  });

export const getUserByUsernameDb = async (username: string) =>
  await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      username: true,
      email: true,
      createdAt: true,
      posts: {
        select: {
          id: true,
          slug: true,
          title: true,
          content: true,
          description: true,
          createdAt: true,
        },
      },
    },
  });

export const getUserByIdDb = async (id: string) =>
  await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      username: true,
      email: true,
    },
  });

export const updateUserByIdDb = async (id: string, data: UpdatedProfileData) =>
  await prisma.user.update({
    where: { id },
    data: data,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      username: true,
    },
  });

export const createUserDb = async (
  username: string,
  password: string,
  email: string
) =>
  await prisma.user.create({
    data: {
      username,
      password,
      email,
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
