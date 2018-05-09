var mongoose = require('mongoose');
var User = require('./User.js');
var slug = require('slug');

var NoteSchema = mongoose.Schema({
	slug:String,
    title: String,
    contentState: String, 
    description: String,
    content:String,
    imageurl: String,
    tagList: [{ type: String }],
    genre: String,
    favoritesCount: {type: Number, default: 0},
    views: {type: Number, default: 0},
    rating: {type: Number, default: 0},
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
});

NoteSchema.pre('validate', function(next){
  if(!this.slug)  {
    this.slugify();
  }

  next();
});

NoteSchema.methods.slugify = function() {
  this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};	

NoteSchema.methods.toJSONFor = function(user){
  return {
    slug: this.slug,
    title: this.title,
    description: this.description,
    contentState:this.contentState,
    content: this.content,
    genre:this.genre,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    imageurl: this.imageurl,
    tagList: this.tagList,
    favorited: user ? user.isFavorite(this._id) : false,
    favoritesCount: this.favoritesCount,
    author: user?this.author.toProfileJSONFor(user):this.author
  };
};


module.exports = mongoose.model('Note', NoteSchema);

