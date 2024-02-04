import {
  Box,
  Button,
  List,
  ListItem,
  Typography,
  useTheme,
} from "@mui/material";
import pluralize from "pluralize-esm";
import React from "react";

type Props = {
  modelNames: string[];
  onClickModelName: (name: string) => void;
  selectedModelName: string;
};

const ModelsMenu = ({
  modelNames,
  onClickModelName,
  selectedModelName,
}: Props) => {
  const theme = useTheme();
  const sortedModelNames = modelNames.sort();

  return (
    <Box
      gap={1}
      display={"flex"}
      flexDirection={"column"}
      width={"15%"}
      height="100vh"
      py={2}
      maxWidth={150}
    >
      {sortedModelNames.map((modelName) => {
        const isSelected = modelName === selectedModelName;

        return (
          <Button
            key={modelName}
            variant={isSelected ? "contained" : "outlined"}
            sx={{ width: "100%" }}
            onClick={() => onClickModelName(modelName)}
          >
            <Typography variant="body2">{pluralize(modelName)}</Typography>
          </Button>
        );
      })}
    </Box>
  );
};

export default ModelsMenu;
