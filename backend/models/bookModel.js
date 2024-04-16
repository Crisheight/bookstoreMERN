import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        publishYear: {
            type: Number,
            required: true,
        },
    }, //End first param
    {
        timestamps: true,
    }
); //End Schema

export const Book = mongoose.model('Book', bookSchema);
