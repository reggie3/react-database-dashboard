import React, { useState } from "react";
import prismaSchemaInfo from "./prismaSchemaInfo.json";
import { Box } from "@mui/material";
import ModelList from "@/components/admin/ModelsMenu";
import ModelForm from "@/components/admin/ModelForm";
import ModelItemsList from "@/components/admin/ModelItemsList";
import { QueryClient, QueryClientProvider } from "react-query";

export type PrismaSchemaInfo = typeof prismaSchemaInfo;
export type ModelInfo = (typeof prismaSchemaInfo)[0];

const queryClient = new QueryClient();

const AdminPage = () => {
  const modelNames = prismaSchemaInfo?.map((model) => model.modelName).sort();
  const [selectedModelName, setSelectedModelName] = useState(
    modelNames?.[0] ?? ""
  );

  const onClickModelName = (name: string) => {
    setSelectedModelName(name);
  };

  const selectedModel = prismaSchemaInfo.find(
    (model) => model.modelName === selectedModelName
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Box display={"flex"} flexDirection={"row"}>
        <ModelList
          modelNames={modelNames}
          onClickModelName={onClickModelName}
          selectedModelName={selectedModelName}
        />
        {/* <ModelForm selectedModel={selectedModel} /> */}
        <ModelItemsList selectedModel={selectedModel} />
      </Box>
    </QueryClientProvider>
  );
};

export default AdminPage;
