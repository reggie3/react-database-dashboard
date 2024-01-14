// pages/api/addUser.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  switch (req.method) {
    case "POST":
      await createUser(req, res);
      break;
    case "GET":
      await getUsers(res);
      break;
    default:
      res.status(405).json({ message: "Method Not Allowed" });
  }

  await prisma.$disconnect();
}

async function createUser(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const { username } = req.body;

    // Validate input
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    // Add user to the database
    const newUser = await prisma.user.create({
      data: {
        username,
      },
    });

    return res
      .status(201)
      .json({ message: "User added successfully", user: newUser });
  } catch (error) {
    console.error("Error adding user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getUsers(res: NextApiResponse): Promise<void> {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
