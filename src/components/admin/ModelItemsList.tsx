import { ModelInfo } from "@/pages/admin";
import React from "react";
import { useModelQuery } from "./hooks/useModelQuery";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { capitalCase } from "change-case";
import pluralize from "pluralize-esm";
import ModelItemsDataGrid from "./ModelItemsDataGrid";
import Alert from "@mui/material/Alert";

type Props = {
  selectedModel?: ModelInfo;
};

const ModelItemsList = ({ selectedModel }: Props) => {
  const { data, isLoading, isError, error } =
    useModelQuery<unknown>(selectedModel);

  console.log({ isError, error });

  if (!selectedModel?.modelName) return null;

  return (
    <Container>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={2}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography>
          {pluralize(capitalCase(selectedModel.modelName))}
        </Typography>

        {isError && (
          <Alert severity="error">
            {(error as Error).message || "Unknown Error"}
          </Alert>
        )}
        {!!data?.length && <ModelItemsDataGrid data={data as {}[]} />}
      </Box>
    </Container>
  );
};

export default ModelItemsList;
