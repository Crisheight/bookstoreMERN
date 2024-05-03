import express from "express";
import {mongoDBURL, PORT} from "./config.js";
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

/**********************************
Initiate middleware that parses request body
**********************************/

app.use(express.json());

/**********************************
 Initiate middleware that handles CORS
 Option 1: Allow all origins with default of cors(*)
 Option 2: Allow custom/specific origins
 **********************************/

app.use(cors());

app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

/**********************************/

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to MERN stack');
})

app.use('/books', booksRoute);

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