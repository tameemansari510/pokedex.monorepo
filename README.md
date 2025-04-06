# 🧩 Pokedex Monorepo

A production-ready monorepo for a Pokedex web application, built with modern tools and best practices in mind. This monorepo includes reusable packages and a Next.js app using a modular architecture powered by Lerna and Yarn Workspaces.

---

## 🧪 Tech Stack

- **Monorepo Management:** [Lerna](https://lerna.js.org/), [Yarn Workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/)
- **Frontend:** [Next.js](https://nextjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/), [next-redux-wrapper](https://github.com/kirill-konshin/next-redux-wrapper)
- **UI Components:** [Material UI (MUI)](https://mui.com/)
- **Reusable Packages:** `components`, `utils` compiled to both CJS and ESM
- **Linting & Formatting:** ESLint, Prettier
- **Docker:** Multi-service setup with Docker and Docker Compose

---

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 20 or higher)
- [yarn](https://yarnpkg.com/)
- [git](https://git-scm.com/downloads) (latest available version)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/tameemansari510/pokedex.monorepo.git
   cd pokedex.monorepo
   ```
2. Install dependencies:
   ```sh
   yarn install
   ``` 
## Running the Project

To start the development server:

```sh
yarn start
```
This will run the application on `http://localhost:3000/`

## Building the Project

To create a production build:

```sh
yarn build
```


## Linting

To check for linting errors:

```sh
yarn lint
```

To automatically fix linting errors:

```sh
yarn lint:fix
```

## Type checks

To check for type errors:

```sh
yarn check-types
```

## Dockerization

To build application via docker:

```sh
yarn docker:build
```

To run application via docker:

```sh
yarn docker:up
```

Note: Running application via docker has some limitation. It is dependendant on .npmrc file which has access token to jfrog to install dependencies in the container. In near future docker steps will be removed from this application.


