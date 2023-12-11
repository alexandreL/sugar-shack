# SugarShack

# Apps

This workspace contains 3 apps:

- API: This API is used for all of the apps. It allows users to log in to the back office, access and modify the list of products, and place orders for products.
- BO: This is the back office used for managing the list of products, stock, and orders.
- Marketplace: This is the marketplace where you can order delicious maple syrup products.

## Getting started

### Prerequisites

- Node.js version should be greater than 18
- It is recommended to have nx installed globally: `npm i -g nx` (if you don't want to install it globally, you can use `npx nx` instead of `nx`)

### Steps to run this project:

- Run the command `npm i`
- Run the command `nx run-many -t serve`

### Understand this workspace

Run the command `nx graph` to see a diagram of the dependencies of the projects.
All the configuration is in the `nx.json` file.
All the projects are located in the `apps` and `libs` folders.
Each project has its own `project.json` file, which contains the configuration and executor for itself.

# Apps

- api: the api. It runs on port 4000
  - Access the swagger at http://localhost:4000/api
- bo: the back office. It runs on port 3001
- marketplace: the marketplace. It runs on port 3000

## Folder structure

- apps: contains all the apps
  - [api](apps%2Fapi): the api
  - [bo](apps%2Fbo): the back office
  - [marketplace](apps%2Fmarketplace): the marketplace
  - [database-migrations](apps%2Fdatabase-migrations): the database migrations
- libs: contains all the libs
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

SQLite is used for development purposes. In production, we will use PostgreSQL.

#### NuxtJS

NuxtJS is a framework for creating Vue.js applications. Its goal is to help Vue developers take advantage of top-notch technologies and features in a fast, easy, and organized way.

## Commands helpers

### Run apps

Run the command `nx run <project-name>:serve` to serve the project.
Run the command `nx run-many -t serve --projects=api,marketplace` to serve multiple projects.

### Run tests

Run the command `nx run-many -t test` to execute all the tests.
Run the command `nx run <project-name>:test` to execute the tests of a specific project.

### Build the apps

Run the command `nx build <project-name>` to build the project.
Run the command `nx run-many --target=build --projects=api,bo` to build multiple projects.

### Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

# Database

## Local Database

The database used for development purposes is SQLite.

## Login for back office

email: alexandre@loubeyres.fr
password: mdpTest123

{
"firstName": "alexandre",
"email": "alexandre@loubeyres.fr",
"hashedPassword": "$argon2id$v=19$m=65536,t=3,p=4$OcV668mg2x63EYu7odLIMQ$fDQrTS7AOSRgww85Y9+ZO8wCmr4syqYu21tI8RDJHgI",
"id": 1
}
