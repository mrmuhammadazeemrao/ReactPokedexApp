import React, { useState } from "react";
import TableData from "../components/TableData";
import { useGetPokemonsQuery } from "../api/pokemonApi";

const HomePage: React.FC = () => {
  const [limit, setLimit] = useState<number>(20);
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);

  const {
    data: pokemons,
    isLoading,
    error,
  } = useGetPokemonsQuery({ offset, limit });

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>Something went wrong</div>;

  return (
    <div>
      {!!pokemons && !!pokemons.results && (
        <TableData
          pokemons={pokemons}
          limit={limit}
          setLimit={setLimit}
          page={page}
          setPage={setPage}
          offset={offset}
          setOffset={setOffset}
        />
      )}
    </div>
  );
};

export default HomePage;
