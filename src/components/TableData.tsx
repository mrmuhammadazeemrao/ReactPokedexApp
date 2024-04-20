import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import useImage from "../hooks/useImage";

interface Pokemon {
  name: string;
  url: string;
}

interface TableDataProps {
  pokemons: {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
  };
  page: number;
  offset: number;
  setPage: Function;
  setOffset: Function;
  limit: number;
  setLimit: (limit: number) => void;
}

const TableData: React.FC<TableDataProps> = ({
  pokemons,
  limit,
  setLimit,
  page,
  setPage,
  offset,
  setOffset,
}) => {
  const generateImageUrl = useImage();

  const handleChangePage = (event: any, newPage: number) => {
    event.preventDefault();
    newPage > page
      ? setOffset(offset + limit + 1)
      : setOffset(offset - limit + 1);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLimit(+event.target.value);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Paper sx={{ width: "100%", overflow: "auto" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    fontWeight: "bold",
                  }}
                  colSpan={2}
                >
                  PokeReact
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pokemons.results.map((row, index) => (
                <TableRow
                  hover
                  key={row.name}
                  component={Link}
                  to={`/pokemon/${index + 1 + page * 20}`}
                  sx={{ textDecoration: "none", color: "inherit" }}
                >
                  <TableCell align="center">
                    <img
                      src={generateImageUrl(index + 1 + page * 20)}
                      alt={`Pokemon ${index + 1}`}
                      width={50}
                    />
                  </TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[20, 40, 60, 80, 100]}
          component="div"
          count={pokemons.count}
          rowsPerPage={limit}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

TableData.propTypes = {
  limit: PropTypes.number.isRequired,
  setLimit: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default TableData;
