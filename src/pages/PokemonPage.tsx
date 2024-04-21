import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
} from "@mui/material";
import DetailRow from "../components/DetailRow";
import { useParams } from "react-router-dom";
import { useGetPokemonQuery } from "../api/pokemonApi";
import useImage from "../hooks/useImage";

const PokemonPage: React.FC = () => {
  const { id } = useParams();
  const generateImageUrl = useImage();
  const { data: pokemon, isLoading, error } = useGetPokemonQuery(id);

  if (isLoading) return <>Loading</>;
  if (error) return <div>Something went wrong</div>;

  const getPokemonTypes = () => {
    return pokemon.types
      .map((typeObj: { type: { name: string } }) => typeObj.type.name)
      .join(", ");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%" }}>
        <Paper sx={{ overflow: "auto" }}>
          <TableContainer>
            {!!pokemon && (
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      key={pokemon.id}
                      sx={{
                        backgroundColor: "primary.main",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {pokemon.name}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={2} align="center">
                      <img
                        src={id && generateImageUrl(+id)}
                        alt={pokemon.name}
                        width="100%"
                      />
                    </TableCell>
                  </TableRow>
                  <DetailRow label="Name" value={pokemon.name} />
                  <DetailRow label="Height" value={pokemon.height} />
                  <DetailRow label="Weight" value={pokemon.weight} />
                  <DetailRow label="Types" value={getPokemonTypes()} />
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </Paper>
      </div>
    </div>
  );
};

export default PokemonPage;
