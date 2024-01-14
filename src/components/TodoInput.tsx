"use client";

import React, { useRef } from "react";
import { Box, Button, TextField } from "@mui/material";
import { createTodo } from "@/server/todos";

const TodoInput = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Add item if user input is not empty
  const onClickAddTodo = async () => {
    if (nameInputRef.current?.value) {
      createTodo({ name: nameInputRef.current.value });
      nameInputRef.current.value = "";
    }
  };

  return (
    <Box display={"flex"} gap={2} flexDirection={"row"} mb={1}>
      <TextField
        variant="outlined"
        placeholder="Add item..."
        inputProps={{ ref: nameInputRef }}
        size="small"
      />
      <Button onClick={onClickAddTodo} variant="outlined" size="small">
        ADD
      </Button>
    </Box>
  );
};

export default TodoInput;
