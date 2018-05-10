var Note = require('../models/note.model.js');
var Draft = require('../models/draft.model.js');
var User = require('../models/User.js');
var Pusher = require('pusher');

exports.create = function(req, res) {
	
	if(!req.body.article.content) {
        return res.status(400).send({message: "Note can not be empty"});
    }
	
    var note = new Note(req.body.article);
	
	console.log(req.body.article);
	User.findById(req.payload.id).then(function(user){
    if (!user) { console.log("no user");
		return res.sendStatus(401); }
	
    note.author = user;
    console.log("users",user.followers)
     note.save(function(err, data) {
        if(err) {		
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the Note."});
        } else {
			console.log(data.slug)
			var pusher = new Pusher({
  appId: '521412',
  key: '5e2ba289c6b150773bd4',
  secret: 'ba5f67a2c43b7a57831e',
  cluster: 'ap2',
  encrypted: true
});
		user.followers.forEach(function(id){	
			console.log(user.username," posted an article" ,id);
			pusher.trigger("my-channel-"+id, 'post', {
  "message": user.username +" posted an article",
  "slug": note.slug
  
});
})

res.status(200).json(note);

            
        }
    })
    
 })
 
    // Create and Save a new Note
	
   
}

exports.findAll = function(req, res, next) {
  var query = {};
  
  var limit = 20;
  var offset = 0;

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
      Note.find(query)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({createdAt: 'desc'})
        .populate('author')
        .exec(),
      Note.count(query).exec(),
      req.payload ? User.findById(req.payload.id) : null,
    ]).then(function(results){
      var articles = results[0];
      var articlesCount = results[1];
      var user = results[2];
	
      return res.json({
        articles: articles.map(function(article){	
          return article.toJSONFor(user);
        }),
        articlesCount: articlesCount
      });
    })
  }).catch(next);
};

exports.findOne = function(req, res, next) {
	
	 Note.findOne({ slug: req.params.noteId})
	 .populate('author')
    .then(function (article) {
      if (!article) { 
		  console.log("in error");
		  return res.sendStatus(404); }
      req.article = article;

     return res.send(article);
    })
	
	
    // Find a single note with a noteId
    
    /*
	Note.findById(req.params.noteId, function(err, note) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Note not found with id " + req.params.noteId});                
            }
            return res.status(500).send({message: "Error retrieving note with id " + req.params.noteId});
        } 

        if(!note) {
            return res.status(404).send({message: "Note not found with id " + req.params.noteId});            
        }

        res.send(note);
    });*/
};

exports.update = function(req, res) {
    // Update a note identified by the noteId in the request
	Note.findById(req.params.noteId, function(err, note) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Note not found with id " + req.params.noteId});                
            }
            return res.status(500).send({message: "Error finding note with id " + req.params.noteId});
        }

        if(!note) {
            return res.status(404).send({message: "Note not found with id " + req.params.noteId});            
        }

        note.title = req.body.title;
        note.content = req.body.content;
        note.author=req.body.author; 
        note.imageurl=req.body.imageurl;

        note.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update note with id " + req.params.noteId});
            } else {
                res.send(data);
            }
        });
    });
};

exports.delete = function(req, res) {
	console.log("in delete");
    // Delete a note with the specified noteId in the request
	/*Note.findByIdAndRemove(req.params.noteId, function(err, note) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Note not found with id " + req.params.noteId});                
            }
            return res.status(500).send({message: "Could not delete note with id " + req.params.noteId});
        }

        if(!note) {
            return res.status(404).send({message: "Note not found with id " + req.params.noteId});
        }

        res.send({message: "Note deleted successfully!"})
    });*/
    console.log("lol", req.params)
     Note.findOne({ slug: req.params.noteId})
	 .populate('author')
    .then(function (article) {
      if (!article) { 
		  console.log("in error");
		  return res.sendStatus(404);}
      req.article = article;

      return res.send(article);
    })
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    if(req.article.author._id.toString() === req.payload.id.toString()){
		console.log("true");
      return req.article.remove().then(function(){
        return res.sendStatus(204);
      });
    } else {
      return res.sendStatus(403);
    }
  })
}


exports.createContent = function(req, res) {
    // Retrieve and return all notes from the database.
    //console.log(req.body.content);
    if(!req.body.content) {
        return res.status(400).send({message: "Draft is empty"});
    }

    var draft = new Draft({body: req.body});

	//console.log(req)
	 draft.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the Note."});
        } else {
            res.send(data);
        }
    });
};

exports.getContent = function(req,res){
	Draft.find().sort('-_id').limit(1).find(function(err, content) {


        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving notes."});
        } else {
            res.json(content);
        }
    });

}


