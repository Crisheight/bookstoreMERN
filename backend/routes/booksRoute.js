import express from 'express';
import {Book} from '../models/bookModel.js';

const router = express.Router();

/**********************************
 Route for saving a new book into database
 **********************************/

router.post('/', async (request, response) => {
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

/**********************************
 Route for getting ALL books from database
 **********************************/

router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});
        const { length } = books;
        return response.status(200).json({
            count: length,
            data: books
        });
    } catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    } //End catch
});

/**********************************
 Route for getting ONE book from database by ID
 **********************************/

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id);
        return response.status(200).json(book);
    } catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    } //End catch
});

/**********************************
 Route for updating existing books
 **********************************/

router.put('/:id', async (request, response) => {
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
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);

        if(!result) {
            return response.status(404).json({Message: 'Book not found'});
        }

        return response.status(200).send({message: 'Book updated successfully'});

    } catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    } //End catch
});

/**********************************
 Route for deleting books by ID
 **********************************/

router.delete('/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({message: 'Book not found'});
        }
        return response.status(200).json({message: 'Book deleted successfully'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    } //End catch
});

export default router;