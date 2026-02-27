# Checkmate

## 🛠 WORK IN PROGRESS 🛠

[API Tests results](https://efemero-formation-fullstack.github.io/checkmate/)

This is an API to organize chess tournaments.

## Technologies used

- [ExpressJS](https://expressjs.com/), a minimalist js web framework
- [Deno](https://expressjs.com/), an alternative to Node.js, with built-in security and Typescript support out of the box
- [TypeScript](https://www.typescriptlang.org/), JavaScript with syntax for types
- [PostgreSQL](https://www.postgresql.org/), a powerful, open source object-relational database

## Dependencies

### With nix flakes (and direnv)

For installing nix, I recommand [nix from determinate systems](https://docs.determinate.systems/).

If you want to autoload the environment with direnv, once nix is installed:

```
nix profile add nixpkgs#direnv
```

And activate it for your shell according to [the doc](https://direnv.net/docs/hook.html).

If you have nix with flakes installed on your system, you can just type `nix develop`.

If you have direnv installed on your system, just `cd` to the project directory, then on the first time type `direnv allow`, then when you `cd` in the directory, the development environment will automatically load.

Once the development environment is loaded, you can initialize the DB, then start it:

```sh
initdb
startdb
```

To stop the DB:

```sh
stopdb
```

The DB is contained into `.pg/`:

- `.pg/data` -> all the data
- `.pg/run` -> the socket
- `.pg/log` -> the logs

You can always restart with a fresh DB:

```sh
stopdb # stop it if it is running
rm -fr ./pg
initdb
startdb
```

### Without nix

Install deno at version 2.6+

Be sure to have PostgreSQL 17+ installed and running.
If needed, create a database user, and the database that will contain all the application data.

## Launch the project

Once you have all the dependencies, create a `.env` file and fill it with desired values. There is a `.env.example` file that can be used as a base. If you go the nix way, you can keep the values from the example file for the DB for the majority of the variables:

```sh
cp .env.example .env
```

If you want to use the fake data generated for the dev, you can erase all data and populate the database with:

```sh
deno run resetdb
```

It will first delete all data from the tables, deleta all the tables and types defined by typeorm,
and creates the admin player (MrCheckmate), 2 test users (one with argon2 encrypted password, one with bcrypt encrypted password), and 1000 players with plausible data.

Then you can launch the project:

```sh
deno run dev
```

The project will first download and install needed dependencies,
and will launch once all is ready.

It will watch for changes in the files and restart the server if needed.

The server will be availaible at <http://localhost:8080> (or whatever port you put as `APP_PORT` in `.env`).
