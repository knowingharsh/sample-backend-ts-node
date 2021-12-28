# Architecture and Setup
rename or copy the `.env.SAMPLE` to `.env`<br/>
to start use `npm run start:dev`, this will start the server and you can go to `locahost:4000` to see the app. or change the port with `.env`

# Folder structure
every folder has `index.ts` which exports everything that we want to export outside that module.

### /src
All code will be in `/src` and `/src/app/ts` is the entrypoint.<br/>
`server.js` will handel express and its relevant middleware, example apollo, cors etc.
### /src/configuration
will have all the configurations including static, process-env, app config etc
ServerPort, Host, token, secrets etc.
All the defaults can be part of this folder.
### /src/controller
these will contain all the controllers, all the subfolder can be `/controller/auth` or `/controller/user` or `/controller/accounts` these will have files with extensions `{anything}.controller.ts` <br/>
`controller/index.ts` will again export everything from controller.

- This should contain business logic only, keep it loosely coupled.
- even if we are using rest or graphql, these should only input_params and context

### /src/database
This will be the database or ORM from any package, including connection api,<br/>
For this project we are using typeORM.
`/database/entity` will have all the entity files with the extensions `{anything}.entity.ts` <br/>
`/database/migrations` will have all the migrations files, use the below command to create and run migrations 

```
./node_modules/.bin/ts-node ./node_modules/.bin/typeorm migration:generate -n meaningfulName

./node_modules/.bin/ts-node ./node_modules/.bin/typeorm migration:run
```
please check documentation of typeORM for more details.

### /src/graphql
we are using Apollo3 for the same
all graphql servers will be part of the this folder.<br/>
`/graphql/open-api` will create a server will work withouts auth-token, example, login, register, forget password, and all the open links. <br/>
`/graphql/private-api` will create a server will work auth-token, example, user, account, transactions, and all the private links. 
<b>the only thing that changes between them is the context which has token parsing and userContext etc available to be shared.</b>

### /src/graphql/{anything}-api
this contains `/schema` as the schema folder having the type definition for API. note that these are different from database or typescript schema, as these will only be used for API signatures as part of graphQL.
this will have mutations query and their respective handler's mapping.

### /src/routes
even on top of graphql, we might need express routes, example `/api/health` these can be part of routes which will be just the route and controller mapping, this will not contain bushiness logic as that is part of controller

### /src/library
will have all the external library such as logger, axios etc


# Packages
this are external packages which are used in this project.
### typescript
we are using typescript for the project, this is the main language used in this project. 
### graphql
we are using apollo3 for the project, please check the documentation 
https://www.apollographql.com/docs/apollo-server/
### typeORM
`ormconfig.ts` will have all the configurations for typeORM, please check the documentation for more details.<br/>
actual implementation is in `/src/database/entity`<br/>
we are using entity in controller to set, get data from database.<br/>
connection object is propagated to all the controllers through apollo context.
### winston
winston is our main logger API, please check the documentation for more details.


