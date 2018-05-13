var mongoose = require('mongoose');
var User = require('./User.js');
var Note = require('./note.model.js');
var slug = require('slug');


var BookSchema = mongoose.Schema({
	slug:String,
    title: String, 
    description: String,
    imageurl: String,
    tagList: [{ type: String }],
    genre: String,
    favoritesCount: {type: Number, default: 0},
    views: {type: Number, default: 0},
    rating: {type: Number, default: 0},
    chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    published:Boolean
}, {
    timestamps: true
});
/*
BookSchema.pre('validate', function(next){
  if(!this.slug)  {
    this.slugify();
  }

  next();
});

BookSchema.methods.slugify = function() {
  this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};	
*/
BookSchema.methods.toJSONFor = function(user){
  return {
	id:this.id,
    slug: this.slug,
    title: this.title,
    description: this.description,
    genre:this.genre,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    imageurl: this.imageurl,
    tagList: this.tagList,
    favoritesCount: this.favoritesCount,
    chapters:this.chapters,
    author: user?this.author.toProfileJSONFor(user):this.author
  };
};


module.exports = mongoose.model('Book', BookSchema);

