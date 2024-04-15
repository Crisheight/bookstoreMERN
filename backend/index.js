import express from "express";
import { PORT } from "./config.js";

const app = express();

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to MERN stack');
})

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});