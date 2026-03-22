import {
  createPost,
  deletePostById,
  findAllPosts,
  findPostById,
  updatePost,
} from "@/lib/server/repositories/blogRepository";

export function getAdminPosts() {
  return findAllPosts();
}

export function getPostForEdit(id: string) {
  return findPostById(id);
}

export async function saveAdminPost(input: {
  id: string;
  title: string;
  content: string;
  published: boolean;
}) {
  if (input.id === "new") {
    await createPost({
      title: input.title,
      content: input.content,
      published: input.published,
    });
    return;
  }

  await updatePost(input.id, {
    title: input.title,
    content: input.content,
    published: input.published,
  });
}

export function removeAdminPost(id: string) {
  return deletePostById(id);
}
