import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { capitalCase } from "change-case";
import React from "react";
import ModelItemMenu from "./ModelItemMenu";

type Props = {
  data: {}[];
};

const ModelItemsDataGrid = ({ data }: Props) => {
  console.log({ data });

  if (!data) return null;

  const columns: GridColDef[] =
    data.length > 0
      ? Object.keys(data[0]).map((key) => ({
          id: key,
          field: key,
          headerName: capitalCase(key),
          flex: 1,
        }))
      : [];

  // Add edit and delete buttons column
  columns.push({
    field: "edit",
    headerName: "",
    sortable: false,
    renderCell: (params) => <ModelItemMenu params={params} />,
    width: 150,
  });

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        checkboxSelection
        density="compact"
      />
    </div>
  );
};

export default ModelItemsDataGrid;
