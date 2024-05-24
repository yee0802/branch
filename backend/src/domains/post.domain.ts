import prisma from "../utils/prisma";

export const getAllPostsDb = async () =>
  await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      description: true,
      image: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          email: true,
          name: true,
          username: true,
        },
      },
    },
  });
