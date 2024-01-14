import Container from "@mui/material/Container";
import { Todo } from "../../prisma/generated/client";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { readTodos } from "@/server/todos";

export interface NewTodo
  extends Omit<Todo, "id" | "created_at" | "completed"> {}

const Todos = async () => {
  const todos = await readTodos();

  return (
    <Container>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={2}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography> Todos</Typography>
        <TodoInput />
        {!!todos.length && <TodoList todos={todos} />}
      </Box>
    </Container>
  );
};

export default Todos;
