import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';

const app = express();

//Middleware that parses request body
app.use(express.json());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to MERN stack');
})


//Route for saving a new book
app.post('/books', async (request, response) => {
    try {
        if(
            !request.body ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Submit all required fields: title, author, publishYear'
            });
        } //End return
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        }; //End newBook

        const book = await Book.create(newBook);
        response.status(201).send(book);

    } catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    } //End catch
});

//Rout for getting ALL books
app.get('/books', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    } //End catch
});

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