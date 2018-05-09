
var passport = require('passport');
var User =  require('../models/User');
var auth = require('../routes/auth');


exports.findProfile=function(req, res){
	//console.log(req.params.username);
  User.findOne({username: req.params.username}).then(function(user){
	req.profile = user;
	
      if(req.payload){
    User.findById(req.payload.id).then(function(user){
      if(!user){ return res.json({profile: req.profile.toProfileJSONFor(false)}); }

	
		console.log(req.profile.toProfileJSONFor(user));
      return res.json({profile: req.profile.toProfileJSONFor(user)});
    });
  } 
else {
    return res.json({profile: req.profile.toProfileJSONFor(false)});
  }
	
	
	
})
};

exports.follow=function(req, res, next){
	var profileId ;

 User.findOne({username: req.params.username}).then(function(person){
    if (!person) { return res.sendStatus(404); }
	req.profile = person;
	profileId = req.profile._id;


  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }
    console.log("followers", person.followers, person.username, user._id)
	person.addFollower(user.id);
    return user.follow(profileId).then(function(){
      return res.json({profile: req.profile.toProfileJSONFor(user)});
    });
});
  }).catch(next);
};

exports.unfollow=function(req, res, next){
  var profileId;
  
  User.findOne({username: req.params.username}).then(function(person){
    if (!person) { return res.sendStatus(404); }
	req.profile = person;
	profileId = req.profile._id;


  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }
	person.removeFollower(user.id)
    return user.unfollow(profileId).then(function(){
      return res.json({profile: req.profile.toProfileJSONFor(user)});
    });
});
  }).catch(next);
};
