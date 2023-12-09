# database-migrations

This project aims to provide a unified way to manage database migration for all projects.


## Generate a migration from entities modifications

To create a new migration, run the following command:

```bash
nx run database-migrations:gen --name <migration-name>
```

Don't forget to edit the import in `apps/database-migrations/src/migration/index.ts`

## Create a new empty migration

To create a new empty migration, run the following command:

```bash
nx run database-migrations:new --name <migration-name> 
```

## Run migrations

To run migrations, run the following command:

```bash
MIGRATION=TRUE nx run database-migrations:migrate
```

For windows users, you have to set the var MIGRATION Like this first: 
```bash
SET MIGRATION=TRUE
```
Then run the command:
```bash
nx run database-migrations:migrate
``` 

## Rollback migrations

You can only revert the last migration. If you want to revert more than one migration, you have to do it one by one.

To do so, run the following command:

```bash
MIGRATION=TRUE nx run database-migrations:revert-last
```
