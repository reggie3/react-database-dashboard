// pages/posts/index.tsx
import React from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import prisma from "@/server/db";
import { Post } from "../../../prisma/generated/client";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { Card, CardContent, CardHeader } from "@mui/material";

interface PostsPageProps {
  posts: Post[];
}

const PostsPage: React.FC<PostsPageProps> = ({ posts }) => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Posts
      </Typography>
      <Link href="/posts/create" passHref>
        <Button variant="contained" color="primary" size="small">
          Create a New Post
        </Button>
      </Link>
      <Box display="flex" flexDirection={"column"} gap={2} padding={3}>
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent>
              <Typography variant="h5" color={"palevioletred"}>
                {post.title}
              </Typography>

              <Typography variant="body1">{post.content}</Typography>
              <Typography
                component="span"
                variant="caption"
                color="textSecondary"
              >
                {post.updatedAt
                  ? `Updated at: ${new Date(post.updatedAt).toLocaleString()}`
                  : `Created at: ${new Date(post.createdAt).toLocaleString()}`}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps<
  PostsPageProps
> = async () => {
  try {
    const posts = await prisma.post.findMany();
    const serializedPosts = JSON.stringify(posts);

    return {
      props: { posts: JSON.parse(serializedPosts) },
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      props: {
        posts: [],
      },
    };
  }
};

export default PostsPage;
