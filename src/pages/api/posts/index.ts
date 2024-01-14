// pages/api/posts.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  switch (req.method) {
    case "POST":
      await createPost(req, res);
      break;
    case "GET":
      await getPosts(res);
      break;
    default:
      res.status(405).json({ message: "Method Not Allowed" });
  }

  await prisma.$disconnect();
}

async function createPost(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const { title, content, author } = req.body;

    // Validate input
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and Content are required" });
    }

    // Add post to the database
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        author: { connect: { id: author } },
      },
    });

    return res
      .status(201)
      .json({ message: "Post added successfully", post: newPost });
  } catch (error) {
    console.error("Error adding post:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getPosts(res: NextApiResponse): Promise<void> {
  try {
    const posts = await prisma.post.findMany();
    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error getting posts:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
