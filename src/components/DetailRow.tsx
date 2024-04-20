import React from "react";
import { TableRow, TableCell, Typography } from "@mui/material";

interface DetailRowProps {
  label: string;
  value: string | number;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value }) => {
  return (
    <TableRow>
      <TableCell align="center">
        <Typography fontWeight="bold">{label}</Typography>
      </TableCell>
      <TableCell align="center">{value}</TableCell>
    </TableRow>
  );
};

export default DetailRow;
