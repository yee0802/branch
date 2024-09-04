import prisma from "../utils/prisma";

export const deleteCommentsOnPostDb = async (id: string) =>
  await prisma.comment.deleteMany({
    where: { postId: id },
  });

export const deleteCommentByIdDb = async (id: string) =>
  await prisma.comment.delete({
    where: { id },
  });
