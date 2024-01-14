"use client";

import React from "react";
import { Todo } from "../../prisma/generated/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { deleteTodo, updateTodo } from "@/server/todos";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

type Props = {
  todos: Todo[];
};

const TodoListGrid = ({ todos }: Props) => {
  const onClickDeleteTodo = (id: string) => {
    deleteTodo(id);
  };

  const onClickComplete = (id: string) => {
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return;

    const updatedTodo: Todo = {
      ...todo,
      completed: !todo.completed,
    };

    updateTodo(updatedTodo);
  };

  const columns: GridColDef<Todo>[] = [
    { field: "name", headerName: "Todo Name", flex: 1 },
    {
      field: "selection",
      renderHeader: () => null,
      width: 25,
      renderCell: (params) => {
        return (
          <IconButton onClick={() => onClickComplete(params.row.id)}>
            {params.row.completed ? (
              <CheckBoxIcon />
            ) : (
              <CheckBoxOutlineBlankIcon />
            )}
          </IconButton>
        );
      },
    },
    {
      field: "delete",
      renderHeader: () => null,
      width: 25,
      renderCell: (params) => (
        <IconButton
          onClick={() => onClickDeleteTodo(params.row.id)}
          aria-label="delete"
        >
          <DeleteForeverIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      <DataGrid rows={todos ?? []} columns={columns} density="compact" />
    </>
  );
};

export default TodoListGrid;
