import prisma from "../utils/prisma";

export const getAllPostsDb = async () =>
  await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      image: true,
      author: true,
    },
  });
