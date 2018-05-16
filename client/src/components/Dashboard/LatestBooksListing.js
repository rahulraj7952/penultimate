import React, { Component } from 'react';
import {Row} from 'react-bootstrap';
import BookListing from './BookListing.js';

class LatestBooksListing extends React.Component{
	render(){
		return(
  			<Row className="show-grid">
    			<p>Latest Books
    				
    					<BookListing book={this.props.book}/>
    				
    			</p>
    		
    		</Row>
    	)
	}
	}
	
	export default LatestBooksListing;
