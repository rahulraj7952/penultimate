var auth = require('./auth');

module.exports = function(app) {
	
    var notifications = require('../controllers/notification.controller.js');

    app.get('/notifications', auth.required, notifications.findAll);
    
    app.put('/notifications/markRead', auth.required, notifications.markRead);

    // Retrieve a single Note with noteId
    
}

