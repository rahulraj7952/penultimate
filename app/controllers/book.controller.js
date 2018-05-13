var Book = require('../models/book.model.js');
var User = require('../models/User.js');
var Pusher = require('pusher');

exports.create = function(req, res,next) {
	if(!req.body.book.title) {
        return res.status(400).send({message: "Book title can not be empty"});
    }
	
    var book = new Book(req.body.book);
	
	console.log("req", req.body);
	User.findById(req.payload.id).then(function(user){
    if (!user) { console.log("no user");
		return res.sendStatus(401); }
	var id;
    book.author = user;
    console.log("twice");
    book.save().then(function() {
		console.log(book.id);
		id=book.id
		return res.json({book:book.toJSONFor(user)});
    }).catch(next)
   
 }).catch(next)
}

exports.findAll = function(req, res, next) {
  var query = {};
  
  var limit = 20;
  var offset = 0;
	console.log("in findAll")
  if(typeof req.query.limit !== 'undefined'){
    limit = req.query.limit;
  }
  if(typeof req.query.offset !== 'undefined'){
    offset = req.query.offset;
  }

  if( typeof req.query.tag !== 'undefined' ){
    query.tagList = {"$in" : [req.query.tag]};
  }
  console.log(req.query.genre)
  if (typeof req.query.genre !=='undefined'){
	  query.genre = req.query.genre;
  }
console.log("req.query", req.query)
  Promise.all([
    req.query.author ? User.findOne({username: req.query.author}) : null,
    req.query.favorited ? User.findOne({username: req.query.favorited}) : null
  ]).then(function(results){
    var author = results[0];
    var favoriter = results[1];

    if(author){
      query.author = author._id;
    }
    

    if(favoriter){
      query._id = {$in: favoriter.favorites};
    } else if(req.query.favorited){
      query._id = {$in: []};
    }

    return Promise.all([
		Book.find(query)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({createdAt: 'desc'})
        .populate('author')
        .populate('chapters')
        .exec(),
      Book.count(query).exec(),
      req.payload ? User.findById(req.payload.id) : null,
    ]).then(function(results){
      var books = results[0];
      var booksCount = results[1];
      var user = results[2];
	
      return res.json({
        books: books.map(function(book){	
          return book.toJSONFor(user);
        }),
        booksCount: booksCount
      });
    })
  }).catch(next);
};

exports.findOne = function(req, res, next) {
	
	 Book.findOne({ slug: req.params.bookId})
	 .populate('author')
	 .populate('chapters')
    .then(function (book) {
      if (!book) { 
		  console.log("in error");
		  return res.sendStatus(404); }
      req.book = book;

     return res.send(book);
    })
};

exports.update = function(req, res) {
	Book.findById(req.params.bookId, function(err, book) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Book not found with id " + req.params.bookId});                
            }
            return res.status(500).send({message: "Error finding book with id " + req.params.bookId});
        }

        if(!book) {
            return res.status(404).send({message: "Book not found with id " + req.params.bookId});            
        }

        book.title = req.body.title;
        book.author=req.body.author; 
        book.imageurl=req.body.imageurl;

        book.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update book with id " + req.params.bookId});
            } else {
                res.send(data);
            }
        });
    });
};

exports.delete = function(req, res) {
     Book.findOne({ slug: req.params.bookId})
	 .populate('author')
	 .populate('chapter')
    .then(function (book) {
      if (!book) { 
		  console.log("in error");
		  return res.sendStatus(404);}
      req.book = book;

      return res.send(book);
    })
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    if(req.book.author._id.toString() === req.payload.id.toString()){
		console.log("true");
      return req.book.remove().then(function(){
        return res.sendStatus(204);
      });
    } else {
      return res.sendStatus(403);
    }
  })
}
