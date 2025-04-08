import { Meta, StoryObj } from "@storybook/react";
import { PokemonCard } from "./PokemonCard";

const meta: Meta<typeof PokemonCard> = {
  title: "Components/PokemonCard",
  component: PokemonCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PokemonCard>;

export const Default: Story = {
  args: {
    name: "Pikachu",
    imageUrl: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
    height: 10,
    weight: 10,
    baseExperience: 100,
  },
};
