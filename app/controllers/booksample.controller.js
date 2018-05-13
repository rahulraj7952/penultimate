var bodyParser = require('body-parser');
var formidable = require('formidable');
var fs=require('fs-extra');
var util= require('util');

var Book = require('../models/book.model.js');

exports.create = function(req, res) {
   var form = new formidable.IncomingForm();
   

    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
      console.log("heere"+this.fields);
    });

	
	 
    form.on('end', function(fields, files) {
    	
    	
        /* Temporary location of our uploaded file */
        var temp_path = this.openedFiles[0].path;
        /* The file name of the uploaded file */
        var file_name = this.openedFiles[0].name;
        /* Location where we want to copy the uploaded file */
        var new_location = '/home/rahul/nodejs/';
 
   	 
 
        fs.copy(temp_path, new_location + file_name, function(err) {  
            if (err) {
                console.error(err);
            } else {
                console.log("success!")
            }
        });
        
       /* var book = new Book({title: this.openedFiles[0].name || "Untitled Book", path:new_location, author: this.openedFiles[0].author , rating:0});

        
        book.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the Note."});
        } else {
            res.send(data);
        }
    });*/
    });

	
    return;
    
    };

