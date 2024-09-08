import prisma from "../utils/prisma";

export const deleteCommentsOnPostDb = async (id: string) =>
  await prisma.comment.deleteMany({
    where: { postId: id },
  });

export const deleteCommentByIdDb = async (id: string) =>
  await prisma.comment.delete({
    where: { id },
  });

export const getCommentsByPostWithCursorDb = async (
  postId: string,
  cursor?: string
) => {
  const pageLimit = 5;

  const comments = await prisma.comment.findMany({
    where: { postId },
    select: {
      id: true,
      content: true,
      author: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          username: true,
        },
      },
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    take: pageLimit + 1,
  });

  const hasNextPage = comments.length > pageLimit;

  if (hasNextPage) {
    comments.pop();
  }

  return {
    comments,
    nextCursor: hasNextPage ? comments[comments.length - 1].id : null,
    hasNextPage,
  };
};
