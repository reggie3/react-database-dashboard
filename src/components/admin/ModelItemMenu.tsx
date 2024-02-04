import { GridRenderCellParams } from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

type Props = {
  params: GridRenderCellParams;
  onClickEditItem: (id: string) => void;
};

const ModelItemMenu = ({ onClickEditItem, params }: Props) => {
  const handleEdit = (id: number) => {
    // Handle edit action
    onClickEditItem(id);
  };

  const handleDelete = (id: number) => {
    // Handle delete action
    console.log(`Delete button clicked for row with ID: ${id}`);
  };

  return (
    <Box display="flex" flexDirection={"row"} gap={1}>
      <IconButton size="small" onClick={() => handleEdit(params)}>
        <EditIcon />
      </IconButton>
      <IconButton size="small" onClick={() => handleDelete(params.row.id)}>
        <DeleteForeverIcon />
      </IconButton>
    </Box>
  );
};

export default ModelItemMenu;
