# Getting Started

## Prerequisites
You must have [docker](https://docs.docker.com/get-docker/) installed.
Run `docker compose up` to spin up a database for the project.
Run `./scripts/generateKeys.sh` to generate authentication keys.
Run `npx prisma migrate dev --name schema` to create the neeed database tables.

## Running the app
Use yarn to manage the project
```sh
yarn # Installs dependencies
yarn dev # Runs the server via nodemon
```

# TODO List
A user can:
- [ ] sign up & create a pantry
- [ ] invite another to the pantry
- [ ] sign up & join an existing pantry
- [ ] add ingredients to their pantry
- [ ] remove quantities of ingredients from their pantry
- [ ] add recipes to their recipe book
- [ ] add editors to their recipes
- [ ] remove editors from their recipes
- [ ] make their recipes public
- [ ] make their recipes private