import { TextField, Checkbox, FormControlLabel } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { ReactElement } from "react";

type MUIComponentProps = {
  type: string;
  label: string;
  field: any;
};

const getMUIComponent = ({
  type,
  label,
  field,
}: MUIComponentProps): ReactElement => {
  console.log({ type });
  switch (type) {
    case "string":
    case "number":
      return (
        <TextField
          {...field}
          size="small"
          type={type === "number" ? "number" : "text"}
          label={label}
        />
      );
    case "boolean":
      return (
        <FormControlLabel
          control={<Checkbox {...field} defaultChecked />}
          label={label}
        />
      );
    case "Date":
      return (
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <DateTimePicker
            {...field}
            label={label}
            slotProps={{ textField: { size: "small" } }}
          />
        </LocalizationProvider>
      );
    // Add more cases for other types as needed
    default:
      console.warn(`Unsupported type: ${type}`);
      return <></>;
  }
};

export default getMUIComponent;
