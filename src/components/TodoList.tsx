import React from "react";
import Box from "@mui/material/Box";
import TodoListGrid from "./TodoListGrid";
import { Todo } from "../../prisma/generated/client";

type Props = {
  todos: Todo[];
};

const TodoList = async ({ todos }: Props) => {
  return (
    <Box>
      <TodoListGrid todos={todos} />
    </Box>
  );
};

export default TodoList;
