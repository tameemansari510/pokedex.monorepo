import { Card, CardContent, Typography, Box } from "@mui/material";
import { capitalize, formatHeight, formatWeight } from "@monorepo/utils";

type PokemonCardProps = {
  name: string;
  imageUrl: string;
  height: number;
  weight: number;
  baseExperience: number;
};

export const PokemonCard = ({
  name,
  imageUrl,
  height,
  weight,
  baseExperience,
}: PokemonCardProps) => (
  <Card
    variant="outlined"
    sx={{
      maxWidth: 400,
      width: "100%",
      mx: "auto",
      boxShadow: 3,
      p: 2,
    }}
  >
    <CardContent>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
      >
        <Typography variant="h4" gutterBottom>
          {capitalize(name)}
        </Typography>
        <Box
          component="img"
          src={imageUrl}
          alt={name}
          sx={{ width: 160, height: 160, mb: 2 }}
        />
        <Typography variant="body1">Height: {formatHeight(height)}</Typography>
        <Typography variant="body1">Weight: {formatWeight(weight)}</Typography>
        <Typography variant="body1">XP: {baseExperience}</Typography>
      </Box>
    </CardContent>
  </Card>
);
