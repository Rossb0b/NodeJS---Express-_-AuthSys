# NodeJS---Express-_-AuthSys

This project is a simple boilerplate for NodeJS API using Mongoose and Express. He only contains two routes; "auth" and "user" that handle an authentification crud.

## Env variables

You must define some in a "nodemon.json" file with the followed structure.

`
{
    "env": {
        "PORT": "",
        "dbUserName": "",
        "dbUserPassword": "",
        "dbClusterUrl": "",
        "JWT_KEY": ""
    }
}
`

dbUserName, dbUserPassword, dbClusterUrl, and the JWT_KEY are required and not provided by default.

## Development server

Run `npm run start:server` using Nodemon for a dev server. You can req on your API at the PORT defined by your env variable or by default on the port 3000.
