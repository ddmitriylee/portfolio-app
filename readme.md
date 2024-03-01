# Portfolio application

Was made as a final project for the Web Technologies 2 (Backend) course.

## Installation 

```
cd server 
npm install

cd client
npm install
```

## Dependencies

### Frontend dependencies:
- "axios": "^1.6.7",
- "core-js": "^3.36.0", 
- "jwt-decode": "^4.0.0", 
- "react": "^18.2.0",
- "react-dom": "^18.2.0",
- "react-icons": "^5.0.1",
- "react-router-dom": "^6.22.2",
- "react-scripts": "5.0.1",
- "react-slick": "^0.30.2",
- "slick-carousel": "^1.8.1",
- "web-vitals": "^2.1.4"
- "tailwindcss": "^3.4.1"

### Backend dependencies:
- "bcrypt": "^5.1.1",
- "cors": "^2.8.5",
- "express": "^4.18.2",
- "joi": "^17.12.2",
- "jsonwebtoken": "^9.0.2",
- "mongoose": "^8.2.0",
- "nodemailer": "^6.9.10"

## Setting up config.json file

config.json file has to be in the /server directory. It has to look like this:

```json
{
    "database": {
        "uri": "yourdburi"
    },
    "server": {
        "port": "anyport",
        "secretKey": "secretKeyForJWT"
    }
}
```