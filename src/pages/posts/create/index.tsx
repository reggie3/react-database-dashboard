import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
} from "@mui/material";
import { User } from "../../../../prisma/generated/client";
import { GetServerSideProps } from "next";
import prisma from "@/server/db";
import Router from "next/router";
import Link from "next/link";

type FormData = {
  title: string;
  content: string;
  author: string;
};

interface CreatePostPostPageProps {
  users: User[];
}

const PostPostForm: React.FC<CreatePostPostPageProps> = ({ users = [] }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle success, maybe redirect or show a success message
        console.log("Post added successfully");
        await Router.push("/posts");
      } else {
        // Handle error, maybe display an error message
        console.error("Error adding post:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  return (
    <Container>
      <Link href="/posts" passHref>
        <Button variant="contained" color="primary" size="small">
          Posts
        </Button>
      </Link>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth margin="normal">
          <Controller
            name="title"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Title"
                fullWidth
                variant="outlined"
                error={!!errors.title}
                helperText={errors.title?.message}
                size="small"
              />
            )}
            rules={{
              required: "Title is required",
            }}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <Controller
            name="content"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Content"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                error={!!errors.content}
                helperText={errors.content?.message}
                size="small"
              />
            )}
            rules={{
              required: "Content is required",
            }}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="author">Author</InputLabel>
          <Controller
            name="author"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                label="Author"
                inputProps={{
                  id: "author",
                }}
                variant="outlined"
                error={!!errors.author}
                displayEmpty
                size="small"
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.username}
                  </MenuItem>
                ))}
              </Select>
            )}
            rules={{
              required: "Author is required",
            }}
          />
        </FormControl>

        <Button type="submit" variant="contained" color="primary" size="small">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps<
  CreatePostPostPageProps
> = async () => {
  try {
    const users = await prisma.user.findMany();
    return {
      props: { users },
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      props: {
        users: [],
      },
    };
  }
};

export default PostPostForm;
