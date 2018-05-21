	import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Row,  Media} from 'react-bootstrap';	
import Icon from 'react-icons-kit';
import { pen } from 'react-icons-kit/icomoon/pen';
import { eye} from 'react-icons-kit/icomoon/eye';
import { starEmpty} from 'react-icons-kit/icomoon/starEmpty';	
		
class ListComponent extends React.Component {
				render(){
					
					 const img="img/t"+(Math.floor(Math.random() * 4) + 1)+".jpg";
					
					return(
					     <div class="single-travel media pb-70">
							<img class="img-fluid d-flex  mr-3" src={img} alt=""/>
							  <div class="dates">
							  	
							  	<p>Adventure</p>
							  </div>
                        
                            <div className="media-body align-self-center">
                                <Link to={`/book/${this.props.book.slug}`}  className="mt-0">
                                    <h4>{this.props.book.title}</h4>
                                </Link>
								{/*<h6><Icon size={14} icon={eye}/> 3.4k <Icon size={14} icon={starEmpty}/> 4.6 </h6>*/}
                                <p> unGogh’s Turbulent Mind Depict One of the Most Complex Concepts in Physic.</p>
                                <div className="meta-bottom d-flex justify-content-between">
                                    <p><Icon size={14} icon={pen}/><Link to={`/`} className="post-author">{this.props.book.author.username}</Link> on <Link to={`/`} className="post-date">Sep 29, 2017 at 9:48 am</Link></p>
                                </div>
                            </div>
                        </div>
					
						)
						}
						}
						
export default ListComponent;
