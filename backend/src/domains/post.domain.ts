import { NewCommentData } from "../types/comment.types";
import { NewPostData } from "../types/post.types";
import prisma from "../utils/prisma";

export const getAllPostsDb = async (cursor?: string) => {
  const pageLimit = 5;

  const posts = await prisma.post.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      content: true,
      description: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          username: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    take: pageLimit + 1,
  });

  const hasNextPage = posts.length > pageLimit;

  if (hasNextPage) {
    posts.pop();
  }

  return {
    posts,
    nextCursor: hasNextPage ? posts[posts.length - 1].id : null,
    hasNextPage,
  };
};

export const getPostByIdDb = async (id: string) =>
  await prisma.post.findUnique({
    where: { id },
    select: {
      id: true,
    },
  });

export const getPostBySlugDb = async (slug: string) =>
  await prisma.post.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
      content: true,
      description: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          username: true,
        },
      },
    },
  });

export const createPostDb = async (data: NewPostData) =>
  await prisma.post.create({
    data: {
      slug: data.slug,
      title: data.title,
      description: data.description,
      content: data.content,
      author: {
        connect: {
          id: data.authorId,
        },
      },
    },
    select: {
      id: true,
      slug: true,
      title: true,
      content: true,
      description: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          username: true,
        },
      },
    },
  });

export const deletePostDb = async (id: string) =>
  await prisma.post.delete({
    where: { id },
    select: {
      title: true,
    },
  });

export const createCommentOnPostDb = async (data: NewCommentData) =>
  await prisma.post.update({
    where: { id: data.postId },
    data: {
      comments: {
        create: {
          content: data.content,
          author: {
            connect: { id: data.authorId },
          },
        },
      },
    },
    select: {
      id: true,
    },
  });
