// pages/api/addTodo.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  switch (req.method) {
    case "POST":
      await createTodo(req, res);
      break;
    case "GET":
      await getTodos(res);
      break;
    default:
      res.status(405).json({ message: "Method Not Allowed" });
  }

  await prisma.$disconnect();
}

async function createTodo(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const { name, completed } = req.body;

    // Validate input
    if (!name) {
      return res.status(400).json({ message: "Todo name is required" });
    }

    // Add todo to the database
    const newTodo = await prisma.todo.create({
      data: {
        name,
        completed,
      },
    });

    return res
      .status(201)
      .json({ message: "Todo added successfully", todo: newTodo });
  } catch (error) {
    console.error("Error adding todo:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getTodos(res: NextApiResponse): Promise<void> {
  try {
    const todos = await prisma.todo.findMany();
    return res.status(200).json(todos);
  } catch (error) {
    console.error("Error getting todos:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
