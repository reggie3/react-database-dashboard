import { ModelInfo } from "@/pages/admin";
import { Box, Checkbox, TextField, Typography } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import getMUIComponent from "./getMuiComponent";

type Props = {
  selectedModel?: ModelInfo;
};

type FormData = Record<string, any>;

const ModelForm = ({ selectedModel }: Props) => {
  const { register, handleSubmit, control } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    // Handle form submission logic here
  };

  if (!selectedModel) <Typography>No Model Selected</Typography>;

  return (
    <Box flex={1} display="flex" flexDirection={"column"} padding={2}>
      <Box>
        <Typography>{selectedModel!.modelName}</Typography>
        <Box display={"flex"} flexDirection={"column"} padding={2} gap={1}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {selectedModel!.typeInfo.map((fieldInfo) => {
              const value = register(fieldInfo.name);

              return (
                <Box key={fieldInfo.name} pb={1}>
                  <Controller
                    control={control}
                    name={fieldInfo.name}
                    render={({ field }) => {
                      const formComponent = getMUIComponent({
                        type: fieldInfo.typescriptType,
                        label: field.name,
                        field,
                      });
                      return formComponent;
                    }}
                  />
                </Box>
              );
            })}
            <button type="submit">Submit</button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default ModelForm;
