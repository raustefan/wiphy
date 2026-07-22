import { prisma } from "@/lib/prisma";

export function findAllPosts() {
  return prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
}

export function findPublishedPosts() {
  return prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });
}

export function findPostById(id: string) {
  return prisma.blogPost.findUnique({ where: { id } });
}

export function findPublishedPostById(id: string) {
  return prisma.blogPost.findFirst({
    where: { id, published: true },
  });
}

export function createPost(data: {
  title: string;
  content: string;
  preview: string;
  author: string;
  publishedAt: Date;
  published: boolean;
}) {
  return prisma.blogPost.create({ data });
}

export function updatePost(
  id: string,
  data: {
    title: string;
    content: string;
    preview: string;
    author: string;
    publishedAt: Date;
    published: boolean;
  },
) {
  return prisma.blogPost.update({
    where: { id },
    data,
  });
}

export function deletePostById(id: string) {
  return prisma.blogPost.delete({ where: { id } });
}
