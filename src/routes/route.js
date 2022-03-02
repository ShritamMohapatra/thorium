//Author mir irshad
const express = require('express');

const router = express.Router();
const BooksModel = require('../models/BookModel')
const BooksController= require('../controllers/BookController')

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});
router.post('/createBooks', BooksController.createBooks );
router.get('/getAllBooks', BooksController.getBooksData)
router.get('/book-author-name', BooksController.bookList)
router.post('/year-books', BooksController.getBooksInYear)
router.post('/get-Particular', BooksController.getParticularBooks)
router.get('/get-inr', BooksController.getXINRBooks)
router.get('/get-random', BooksController.getRandomBooks)
module.exports = router;