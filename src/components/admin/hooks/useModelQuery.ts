import { ModelInfo } from "@/pages/admin";
import { UseQueryOptions, useQuery } from "react-query";
import pluralize from "pluralize-esm";

interface GetModelItemsArgs {
  selectedModel?: ModelInfo;
}

const fetchModelItems = async <T>(selectedModel?: ModelInfo): Promise<T[]> => {
  if (!selectedModel) return [];

  const url = `/api/${pluralize(selectedModel.modelName.toLowerCase())}`;

  console.log({ url });
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${pluralize(selectedModel.modelName)}`);
  }
  return response.json();
};

// Define the custom hook
export const useModelQuery = <T>(
  selectedModel?: ModelInfo,
  options?: UseQueryOptions<T[], Error, TestEnqueue[]>
) => {
  return useQuery([selectedModel?.modelName, selectedModel], () =>
    fetchModelItems<T>(selectedModel)
  );
};
