import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Row,  Media} from 'react-bootstrap';	
import Icon from 'react-icons-kit';
import { pen } from 'react-icons-kit/icomoon/pen';
import { eye} from 'react-icons-kit/icomoon/eye';
import { starEmpty} from 'react-icons-kit/icomoon/starEmpty';	
import  "./Homepage/HomePageStyle.css";					
		
class ListComponent extends React.Component {
				render(){
					return(
					<Row className="list-item">
							
							 <Media>
								
								<Media.Body>
								
								<Media.Heading>
									<Link to={`/book/${this.props.book.slug}`} className="list-link">
									<h4>{this.props.book.title}</h4>
									</Link>
								</Media.Heading>
								
								<h5><Icon size={14} icon={pen}/> <Link to={`/`} className="list-link">{this.props.book.author.username}</Link></h5>
								<h6><Icon size={14} icon={eye}/> 3.4k <Icon size={14} icon={starEmpty}/> 4.6 </h6>
								<br/>
								
								<p>	book description should go here 
								</p>
								</Media.Body>
									<Media.Right>
									<img width={150} height={225} src="http://via.placeholder.com/200x300" alt="thumbnail" className="list-image" />
								</Media.Right>
							</Media>
							
					
					</Row>
						)
						}
						}
						
export default ListComponent;
