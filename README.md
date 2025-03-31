# Project: Test-Sermaluc - Backend

Sermaluc Challenge: Developing a user CRUD that can handle JWTs

## Project Structure Overview

### Directory Structure

Project structure:

- **`src`**: Source code directory.
  - **`common`**:
    - **`adapters`**: Configuring external libraries that have critical functions in the code.
    - **`decorator`**: Custom decorators that simplify the application of validation functions to the code.
    - **`guard`**: Endpoint protection system, validates the access token and allows access to public functions
    - **`validator`**: Implements the logic that is consumed by decorators
  - **`modules`**
    - **`auth`**: Base module that controls all logic over login and auth for users.
    - **`user`**: Base module that controls all logic over users.
  - **`app.module`**
  - **`main.ts`** 
- **`.env.example`**: Example of environment variables file.
- **`.eslintrc.js`**: rules to good programming practices.
- **`.gitignore`**: Files and directories should be ignored by Git version control.
- **`.prettierrc.js`**: Configuration file to work fine with eslint.
- **`package.json`**: Npm configuration file.
- **`tsconfig.json`**: TypeScript configuration file.

### Environment Configuration

For development, a `.env` file is used to manage environment variables. The following variables are defined:

```plaintext
PORT=

DB_HOST=
DB_PORT=
DB_NAME=
DB_USERNAME=
DB_PASSWORD=

JWT_SECRET_TOKEN=
```

### Development and Deployment Commands

- `npm run start:dev`: Compile TypeScript files to JavaScript and add whach funtion to load changes on real time.
- `npm run build`: Create the build to load in production.
- `npm run test`: Run the test of project. Can be used with others flags for more options.

## Documentation

### API Endpoints
  ### QR-Maker

- POST: [/] Endpoint to create new users, requires a Body.
- GET: [/] Endpoint to get all existing users
- GET: [/:user_id] Endpoint to get the information of one user by id.
- DELETE: [/:user_id] Endpoint that delete user by user_id.

  ### Auth

- POST: [/login] Endpoint for logIn service and get new tokens.
 
### Dependences

- **@nestjs**: Provides tools and core function to the function of project.
- **class-transformer**: Libraries used to add validation in dtos object or creation of entities, work in pair with calss validator.
- **class-validator**: Libraries used to add validation in dtos object or creation of entities, work in pair with calss transformer.
- **Dotenv**: Loads environment variables from a .env file, helping manage configuration securely.
- **Pg**: PostgreSQL client for Node.js that allows interaction with PostgreSQL databases.
- **Typeorm**: An ORM that allows interaction with databases using entities and repositories.
- **uuid**: Most used library to generate powerfull id to objects.
- **bcryptjs**: Library used to encode password and compare the encode and plain password.


### devDependences

- **@types/**: Provides TypeScript type definitions to the libraries, this is only applicable if the library have a definition file, ensuring type safety in development.
- **eslint**: Ensure and enforce good programming practice in the dev process.
- **prettier**: Add more functions and complements to eslint.
- **jest**: Allow the implementation of test.

### Installation Commands
  Important: Have NodeJs and Install NestJs.
  For the fist launch, change app.module.ts the configuratios of TypeOrmModule.ForRoot: autoLoadEntities and synchronize in true, after change to false.
- General dependencies: `npm install`
- For BDD, install docker and run the command docker-compose up in the project root, the using table-plus or DBeaver import `test-sermaluc.sql`.
- For test run: npm run test.
- To test log in and protected services, user: mariosamc8@gmail.com - password: contraseña1.