import { createServer } from "node:http";
import dotenv from 'dotenv';
dotenv.config();
import { server } from "./server/server";

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`The app is listening to port ${PORT}`);
});