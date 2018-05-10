import React,{Component} from "react";
import {Grid, Row, Col} from 'react-bootstrap';
import './Listing.css'

class Listing extends React.Component{
	render(){
		return(
		<Grid>
			<Row>
				<Col md={5} mdOffset={3}>
					<h3>Search for {this.props.match.params.id}</h3>
					<div class="form-group">
					<div class="icon-addon addon-lg">
                    <input type="text" placeholder="Type the genre here..." class="form-control" id="type"/>
                    <label for="email" class="glyphicon glyphicon-search" rel="tooltip" title="email"></label>
                </div>
            </div>
		
		</Col>
		</Row>
		</Grid>
		)
	
	}

}

export default Listing;
