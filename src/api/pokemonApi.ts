import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../config";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: config.URL.BASE_URL }),
  endpoints: (builder) => ({
    getPokemons: builder.query({
      query: ({ offset, limit }) => {
        return `/?offset=${offset}&limit=${limit}`;
      },
    }),
    getPokemon: builder.query({
      query: (id: string) => `/${id}`,
    }),
  }),
});

export const { useGetPokemonsQuery, useGetPokemonQuery } = pokemonApi;
