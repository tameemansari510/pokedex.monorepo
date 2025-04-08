import type { StorybookConfig } from "@storybook/react-webpack5";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const config: StorybookConfig = {
  stories: ["../*.stories.@(ts|tsx|js|jsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-docs",
    "@storybook/addon-actions",
    "@storybook/addon-controls",
    "@storybook/addon-viewport",
    "@storybook/addon-backgrounds",
    "@storybook/addon-toolbars",
    "@storybook/addon-outline",
    "@storybook/addon-measure",
    "@storybook/addon-highlight",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config) => {
    config.resolve = {
      ...config.resolve,
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      alias: {
        ...(config.resolve?.alias || {}),
        "@": path.resolve(dirname, "../"),
      },
    };

    config.module?.rules?.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
      ],
      exclude: /node_modules/,
    });

    return config;
  },
};

export default config;
