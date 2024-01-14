import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

type FormData = {
  username: string;
};

const AddUserForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle success, maybe redirect or show a success message
        console.log("User added successfully");
      } else {
        // Handle error, maybe display an error message
        console.error("Error adding user:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth margin="normal">
        <Controller
          name="username"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Username"
              fullWidth
              variant="outlined"
              size="small"
              error={!!errors.username}
              helperText={errors.username?.message}
            />
          )}
          rules={{
            required: "Username is required",
          }}
        />
      </FormControl>
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUserForm;
