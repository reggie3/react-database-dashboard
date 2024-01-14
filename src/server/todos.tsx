"use server";

import { NewTodo } from "@/components/Todos";
import { revalidatePath } from "next/cache";
import prisma from "@/server/db";
import { Todo } from "../../prisma/generated/client";

const checkPrisma = () => {
  if (!prisma) {
    console.error("prisma not found");
    return false;
  }
  return true;
};

export const createTodo = async (newTodo: NewTodo) => {
  "use server";
  if (checkPrisma()) {
    const todo = await prisma.todo.create({
      data: newTodo,
    });
    revalidatePath("/");

    return todo;
  }
};

export const readTodos = async () => {
  "use server";
  if (checkPrisma()) {
    const todos = await prisma.todo.findMany();
    revalidatePath("/");

    return todos;
  }
  return [];
};

export const updateTodo = async (todo: Todo) => {
  "use server";
  if (checkPrisma()) {
    const { id, created_at, ...rest } = todo;
    const updatedTodo = await prisma.todo.update({
      where: { id: todo.id },
      data: todo,
    });
    revalidatePath("/");

    return updatedTodo;
  }
  return [];
};

export const deleteTodo = async (id: string) => {
  "use server";
  if (checkPrisma()) {
    const todo = await prisma.todo.delete({
      where: {
        id,
      },
    });
    revalidatePath("/");

    return todo;
  }
};
