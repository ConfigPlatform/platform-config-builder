# Platform-Config-Builder
This platform is designed for creating, managing, and deploying configurations that provide functionality for configuring administrative applications. 
The application includes a set of handlers for various operations such as selection, sorting, and merging data from different entities. 
The platform uses query builders to generate SQL queries and execute them in the database, with the results being passed to the client.

## Technical Stack
### Programming Languages
- TypeScript
- JavaScript
### Package Manager
- npm
### Tools
- Node
- TypeScript ESLint
- FS Extra
- Lodash
- TS Node
- TypeORM
- ESLint
- Prettier
- Husky
- Lint-staged
- Nodemon

## Installation and Setup
Install the necessary packages on the server using the command **npm install**.

To start the server in development mode, use the command **npm run start**.

---

Create .env file and add necessary variables:
CONFIG_PATH=../config-kompot
SERVER_PATH=../platform-server

