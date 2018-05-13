var auth = require('./auth');

module.exports = function(app) {
	
    var notes = require('../controllers/note.controller.js');
    var books = require('../controllers/book.controller.js');

    // Create a new Note
    app.post('/articles/:bookId', auth.required, notes.create);

    // Retrieve all Notes
    app.get('/articles', auth.optional, notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/articles/:noteId', notes.findOne);

    // Update a Note with noteId
    app.put('/articles/:noteId', notes.update);

    // Delete a Note with noteId
    app.delete('/articles/:noteId',auth.required,  notes.delete);
    // upload a book 
    app.post('/upload/server', books.create);
   
}

