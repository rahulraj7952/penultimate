
import React, { Component } from 'react';
import {Row, Col, Panel,Image} from 'react-bootstrap';

import {
  Link
} from "react-router-dom";


class BookListing extends React.Component{
	render(){
		return(
		<div>
		<hr/>
  			<Row className="show-grid">
    			<Col xs={6} md={3}>
    				<Panel>
    					<Panel.Body>   
    					<Link to="/book"> 
      					<p>Name</p>
      				</Link>
      				<Image src="https://zeerk.com/mod/uploads/2017/03/book-523x405.jpg " responsive/>
      					<h6> {this.props.book} </h6>
      					<h6> Critic Rating</h6>
       				</Panel.Body>
      			</Panel>
    			</Col>
    		</Row>
    		</div>
    	
    	)
	}
	}
	
	export default BookListing;
