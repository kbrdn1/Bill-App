# Bills-App
A Bills application to learn Vue3 and NodeJS

## Technologies used:

### Backend:
- NodeJS
- Express
- MongoDB
- Mongoose

### Frontend:
- Vue3
- Vite
- TailwindCSS

## Project setup
### Backend:
#### Install pnpm
```npm install -g pnpm``` or ```yarn global add pnpm```
#### Install dependencies
```
cd bill-backend-app
pnpm install
```
#### Create a .env file in backend root directory
```
PORT=3000
VERSION=1.0.0
HOST=127.0.0.1
PORT=3000
CORS=http://localhost:5173
MONGO_USER=<your mongo user>
MONGO_PASS=<your mongo password>
MONGO_CLUSTER=<your mongo cluster>
MONGO_DB=<your mongo db>
```

#### Run the server
```
pnpm start
```

### Frontend:
#### Install dependencies
```
cd bill-frontend-app
pnpm install
```

#### Run the app
```
pnpm dev
```