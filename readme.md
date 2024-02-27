# Portfolio application

Was made as a final project for the Web Technologies 2 (Backend) course.

## Setting up config.json file

config.json file has to be in the /server directory. It has to look like this:

```json
{
    "database": {
        "uri": "yourdburi"
    },
    "server": {
        "port": anyport,
        "secretKey": "secretKeyForJWT"
    }
}
```