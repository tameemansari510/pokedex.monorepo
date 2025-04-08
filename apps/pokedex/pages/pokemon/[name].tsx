import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PokemonCard } from "@monorepo/components";
import { capitalize, formatHeight, formatWeight } from "@monorepo/utils";
import React from "react";
import { Button, Box } from "@mui/material";

export default function PokemonDetail() {
  const { name } = useRouter().query;
  const router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (name) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((res) => res.json())
        .then(setData);
    }
  }, [name]);

  if (!data) return <p>Loading...</p>;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 3,
        padding: 2,
      }}
    >
      <Box sx={{ maxWidth: 400, width: "100%" }}>
        <PokemonCard
          name={capitalize(data.name)}
          imageUrl={data.sprites.front_default}
          height={+formatHeight(data.height)}
          weight={+formatWeight(data.weight)}
          baseExperience={data.base_experience}
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={() => router.back()}
        sx={{ width: "fit-content" }}
      >
        Back
      </Button>
    </Box>
  );
}
