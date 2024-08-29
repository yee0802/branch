import { NewPostData } from "../types/post.types";
import prisma from "../utils/prisma";

export const getAllPostsDb = async () =>
  await prisma.post.findMany({
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
