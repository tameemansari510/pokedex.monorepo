import { useEffect } from "react";
import { useRouter } from "next/router";
import {
  fetchPokemonList,
  setSelectedPokemon,
  setFilterModel,
  setSortModel,
} from "../store/slices/pokemon";
import { DataGrid } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Typography, Box, Container } from "@mui/material";

export default function Home() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const page = Number(router.query.page || 1);
  const offset = (page - 1) * 10;

  const { results, count, status, selectedPokemon, filterModel, sortModel } =
    useAppSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(fetchPokemonList(offset));
  }, [offset, dispatch]);

  const isSelectedOnPage = results.some((row) => row.name === selectedPokemon);
  const rowSelectionModel =
    isSelectedOnPage && selectedPokemon ? [selectedPokemon] : [];

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      px={2}
    >
      <Container maxWidth="md">
        <Typography variant="h6" align="center" gutterBottom>
          Pokémon List {selectedPokemon && `(Selected: ${selectedPokemon})`}
        </Typography>

        <Box width="100%">
          <DataGrid
            autoHeight
            rows={results.map((p) => ({ id: p.name, name: p.name }))}
            columns={[{ field: "name", headerName: "Name", width: 200 }]}
            rowCount={count}
            pagination
            paginationMode="server"
            pageSizeOptions={[10]}
            paginationModel={{ page: page - 1, pageSize: 10 }}
            onPaginationModelChange={(model) =>
              router.push(`/?page=${model.page + 1}`)
            }
            onRowClick={(params) => {
              dispatch(setSelectedPokemon(params.row.name));
              router.push(`/pokemon/${params.row.name}`);
            }}
            loading={status === "loading"}
            rowSelectionModel={rowSelectionModel}
            filterModel={filterModel || undefined}
            onFilterModelChange={(model) => dispatch(setFilterModel(model))}
            sortModel={sortModel || []}
            onSortModelChange={(model) => dispatch(setSortModel(model))}
            initialState={{
              sorting: {
                sortModel: sortModel || [],
              },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}
