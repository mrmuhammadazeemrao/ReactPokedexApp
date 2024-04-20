// @ts-nocheck
import { RootState } from "../store";
import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer, { fetchPokemon } from "./pokemonReducer";

jest.mock("fetch-mock", () => ({
  getOnce: jest.fn(),
  restore: jest.fn(),
}));

describe("pokemonSlice thunks", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("dispatches getPokemonsSuccess when fetchPokemons is called and succeeds", async () => {
    const responseData = { results: [{ id: 1, name: "Bulbasaur" }] };
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(responseData),
      headers: { "content-type": "application/json" },
    });

    const initialState: RootState = {
      pokemon: {
        pokemons: [],
        pokemon: null,
        loading: false,
        error: null,
      },
    };

    const store = configureStore({
      reducer: { pokemon: pokemonReducer },
      preloadedState: initialState,
    });

    await store.dispatch(fetchPokemon("end:/pokemons"));

    const expectedStateAfterSuccess: RootState = {
      pokemon: {
        pokemons: [],
        pokemon: responseData,
        loading: false,
        error: null,
      },
    };

    expect(store.getState()).toEqual(expectedStateAfterSuccess);
  });
});
