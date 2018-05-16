var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var NotificationSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  to: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
  verb: String,
  readby: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
  link: String,
  objectType:String
  
}, {timestamps: true});

//UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});
NotificationSchema.methods.toJSONFor = function(user, readStatus){
  return {
	from:this.from,
	verb:this.verb,
    readState:readStatus,
    link:this.link,
    createdAt:this.createdAt
  };
};

module.exports=mongoose.model('Notification', NotificationSchema);
