// // @ts-nocheck
import React from "react";
import { render, screen } from "@testing-library/react";
import { useGetPokemonQuery } from "../api/pokemonApi";
import PokemonPage from "../pages/PokemonPage";

jest.mock("../api/pokemonApi", () => ({
  useGetPokemonQuery: jest.fn(),
}));

describe("PokemonPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display "Loading" text when the loading state is true', () => {
    (useGetPokemonQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: undefined,
    });

    render(<PokemonPage />);
    expect(screen.getByText("Loading"));
  });

  it("should display error message when there is an error", () => {
    (useGetPokemonQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: "Error",
    });

    render(<PokemonPage />);
    expect(screen.getByText("Something went wrong"));
  });
});
