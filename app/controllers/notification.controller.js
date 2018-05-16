var Note = require('../models/note.model.js');
var Notification= require('../models/notification.model.js');
var User = require('../models/User.js');
var Pusher = require('pusher');
var Book= require('../models/book.model.js');

exports.findAll = function(req, res, next) {
	console.log("req.payload.id", req.payload.id);
	 User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }
    
    console.log("in notification", user.id);
    
    Notification.find({to:{$in:[user.id]}}).populate("from").then(function(notifications){
		if (!notifications){
			console.log("no notification found for user");
			return res.sendStatus(401)
		}
		
		else if(notifications.length==0){
			console.log("no notification till now")
			var first=[{"from":{"username":"site name"}, "verb":"welcomes you", "readState":false}];
			return res.json(first)}
		else {
			console.log("notifications.found", notifications);
			return res.json({
				notifications:notifications.map(function(notification){
						var readState=false;
						console.log(user.id)
				
						if(notification.readby.indexOf(user.id)>-1)
							{readState=true}
						return notification.toJSONFor(user, readState);
        })
	})
			};
	}).catch(next);
	
 
}).catch(next);
}

exports.markRead = function(req,res, next){
	
	User.findById(req.payload.id).then(function(user){
		if(!user){
			return res.sendStatus(401);
			}
	 Notification.find({to:{$in:[user.id]}}).then(function(notifications){
		if (!notifications){
			console.log("no notification found for user");
			return res.sendStatus(401)
		}
		else if (notifications.length==0){
			console.log("no notification till now")
			return res.sendStatus(200)
		}
		
		else {
			notifications.map(function(notification){
				notification.readby.push(user.id)
			notification.save();
			
			
			})
		}
	}).catch(function(err){console.log(err)});
		}).catch(function(err){console.log(err)})
	
	}

