var auth = require('./auth');

module.exports = function(app) {
	
    var books = require('../controllers/book.controller.js');

    // Create a new Book
    app.post('/books', auth.required, books.create);

    // Retrieve all Books
    app.get('/books', auth.optional, books.findAll);

    // Retrieve a single Note with noteId
    app.get('/books/:bookId', books.findOne);

    // Update a Note with noteId
    app.put('/books/:bookId', books.update);

    // Delete a Note with noteId
    app.delete('/books/:bookId',auth.required,  books.delete);
   
}

