import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import LatestBooksListing from './LatestBooksListing';
import TopBooksListing from './TopBooksListing';
import Submit from './Submit';
import SideNav from './SideNav';
import axios from 'axios';

class Dashboard extends React.Component{
	
	
	
	constructor(props, context) {
   super(props, context);

    
   this.handleSubmit = this.handleSubmit.bind(this);
   this.handleUpload = this.handleUpload.bind(this);
	
   this.state = {
      bookName:''
      
    };
  }
  
	handleSubmit(book){
		//e.preventDefault();
		console.log(book+'cc');
		this.setState({bookName:book});
		console.log('3'+this.state.bookName);
	}	
	
	handleUpload(e){
		e.preventDefault();
		var data =new FormData();
		data.append('file', document.getElementById('fileupload').files[0]);
		console.log("1", data)
		axios.post('/upload/server', data)
            .then(function (res) {
             console.log(res.data);
            })
            .catch(function (err) {
              console.log(err.message);
            });

	}
	
	render(){
	return(
		<div>
		<div>
		
		<Grid>
			<Col xs ={6} md ={3} >
				<SideNav/>
			</Col>
			<Col xs ={12} md={9} mdPull={1}>
			<Row className="Dashboard">
			
				
				<h3>Dashboard</h3>
				<hr/>
				
			</Row>
			<Row>
		
				<Col xs={12} md={8}>
  						<LatestBooksListing book={this.state.bookName}/>
  					<TopBooksListing/>
  				</Col>
  				<Col xs={6} md={3} mdPush={1}>
  					<Submit onSubmit={this.handleSubmit}/> 
  					<Row>
    		<form onsubmit ="return false">
				<input type="file" name="fileupload" value="fileupload" id="fileupload"/>
				<label for="fileupload"> Select a file to upload</label>
				<button id="upload" class="btn btn-primary" onClick={this.handleUpload}>Upload</button>
			</form>
			</Row>
  				</Col>
  			</Row>
  			</Col>
  		</Grid>
  		<hr/>
		</div>
  		</div>
	)}

}

export default Dashboard; 
