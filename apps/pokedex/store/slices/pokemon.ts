import { GridFilterModel, GridSortModel } from "@mui/x-data-grid";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export const fetchPokemonList = createAsyncThunk(
  "pokemon/fetchList",
  async (offset: number = 0) => {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`
    );
    return await res.json();
  }
);

type PokemonState = {
  results: Array<{ name: string }>;
  count: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  selectedPokemon: string;
  filterModel: GridFilterModel;
  sortModel: GridSortModel;
};

const initialState: PokemonState = {
  results: [],
  count: 0,
  status: "idle",
  selectedPokemon: null,
  filterModel: null,
  sortModel: null,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setSelectedPokemon(state, action: PayloadAction<string | null>) {
      state.selectedPokemon = action.payload;
    },
    setFilterModel: (state, action) => {
      state.filterModel = action.payload;
    },
    setSortModel: (state, action) => {
      state.sortModel = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.results = action.payload.results;
        state.count = action.payload.count;
        state.status = "succeeded";
      });
  },
});

export const { setSelectedPokemon, setFilterModel, setSortModel } =
  pokemonSlice.actions;

export default pokemonSlice.reducer;
