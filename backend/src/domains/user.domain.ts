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
