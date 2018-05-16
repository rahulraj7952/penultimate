import React, { Component } from 'react';
import { Col} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import './HomePageStyle.css';

class HomePageCard extends React.Component{
		
	
	render(){
		
		//const htmlString = this.props.note.contentState;
		//const Content= () => (
  //<div dangerouslySetInnerHTML={{ __html: htmlString }} />
  //);
		return(
				<Col xs={6} md={4}>				
				<div className="cards">
  					<img className="card-image" src="http://via.placeholder.com/200x300" alt="Avatar"/ >
						<Link to={`/`} className="preview-link">																																																																
						<div className="card-texts">
						<h5><b>{this.props.book.title}</b></h5>
						<p> {this.props.book.author.username} {this.props.book.createdAt}</p>
						<h7>Description should go here</h7>
						</div>
						</Link>
    				
				</div> 
				<br/>
				</Col>	
				)
			}
		}
export default HomePageCard;
