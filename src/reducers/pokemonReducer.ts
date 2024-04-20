import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";

interface PokemonState {
  pokemons: any[];
  pokemon: any;
  loading: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  pokemons: [],
  pokemon: null,
  loading: false,
  error: null,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    getPokemonsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getPokemonStart(state) {
      state.loading = true;
      state.error = null;
    },
    getPokemonsSuccess(state, action: PayloadAction<any[]>) {
      state.loading = false;
      state.pokemons = action.payload;
    },
    getPokemonSuccess(state, action: PayloadAction<any[]>) {
      state.loading = false;
      state.pokemon = action.payload;
    },
    getPokemonsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getPokemonsStart,
  getPokemonsSuccess,
  getPokemonsFailure,
  getPokemonStart,
  getPokemonSuccess
} = pokemonSlice.actions;

export const fetchPokemons =
  (url: string): AppThunk<void> =>
  async (dispatch) => {
    try {
      dispatch(getPokemonsStart());
      const response = await fetch(url);
      const data = await response.json();
      dispatch(getPokemonsSuccess(data));
    } catch (error: any) {
      dispatch(getPokemonsFailure(error.message));
    }
  };

  export const fetchPokemon =
  (url: string): AppThunk<void> =>
  async (dispatch) => {
    try {
      dispatch(getPokemonStart());
      const response = await fetch(url);
      const data = await response.json();
      dispatch(getPokemonSuccess(data));
    } catch (error: any) {
      dispatch(getPokemonsFailure(error.message));
    }
  };

export default pokemonSlice.reducer;
