import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';

const app = express();

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to MERN stack');
})

mongoose.connect(mongoDBURL)
        .then(() => {
            console.log("MongoDB Connected");
            app.listen(PORT, () => {
                console.log("App listening to port " + PORT);
            });
        })
        .catch((error) => {
            console.log(error);
        });