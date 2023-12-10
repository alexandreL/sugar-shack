# SugarShack

## Getting started

### Prerequisites

- Node.js > 18
- nx in global is better: `npm i -g nx` (if you don't want to install it globally, you can use `npx nx` instead of `nx`)

### Steps to run this project:

- Run `npm i` command
- Run `nx run-many -t serve` command

### Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.
All the configuration is in `nx.json` file.
All the projects are in `apps` and `libs` folders.
Each project has its own `project.json` file, witch contains the configuration and executor for itself.

# Apps

- api: the api. Run on port 4000
- bo: the back office. Run on port 3001
- marketplace: the marketplace. Run on port 3000

## Folder structure

- apps: all the apps
  - [api](apps%2Fapi): the api
  - [bo](apps%2Fbo): the back office
  - [marketplace](apps%2Fmarketplace): the marketplace
  - [database-migrations](apps%2Fdatabase-migrations): the database migrations
- libs: all the libs
  - [entity](libs%2Fentity): the database entities
  - [shared](libs%2Fshared): the shared code between apps
  - [ui](libs%2Fui): the shared ui components

## Technical choices

#### Nx

Nx makes it easy to build and test modern full-stack applications. It provides an opinionated approach to application project structure and patterns.

#### NestJS

NestJS is a framework for building efficient, scalable Node.js server-side applications. It is built with TypeScript.

#### TypeORM

TypeORM is an ORM that can run in NodeJS. Nest provides tight integration with TypeORM to easily integrate database access into your application.

#### SQLite

SQLite for development reasons. In production, we will use PostgreSQL.

#### NuxtJS

NuxtJS is a framework for creating Vue.js applications. Its goal is to help Vue developers take advantage of top-notch technologies and features in a fast, easy and organized way.

### Run apps

Run `nx run <project-name>:serve` to serve the project.
Run `nx run-many -t serve --projects=api,marketplace` to serve multiple project.

### Run tests

Run `nx run-many -t test` to execute all the tests.
Run `nx run <project-name>:test` to execute the test of a specific project.

### Build the apps

Run `nx build <project-name>` to build the project.
Run `nx run-many --target=build --projects=api,bo` to build multiple project.

### Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

# Database

## Local Database

database is a sqlite database for development reasons

## login for back office

email: alexandre@loubeyres.fr
password: mdpTest123

{
"firstName": "alexandre",
"email": "alexandre@loubeyres.fr",
"hashedPassword": "$argon2id$v=19$m=65536,t=3,p=4$OcV668mg2x63EYu7odLIMQ$fDQrTS7AOSRgww85Y9+ZO8wCmr4syqYu21tI8RDJHgI",
"id": 1
}
