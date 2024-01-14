// pages/api/posts/[id].ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      if (id) {
        await getPostById(res, id.toString());
      } else {
        res.status(400).json({ message: "Post ID is required for retrieval" });
      }
      break;
    default:
      res.status(405).json({ message: "Method Not Allowed" });
  }

  await prisma.$disconnect();
}

async function getPostById(res: NextApiResponse, id: string): Promise<void> {
  try {
    // Retrieve post by ID from the database
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (post) {
      return res.status(200).json(post);
    } else {
      return res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    console.error("Error getting post by ID:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
