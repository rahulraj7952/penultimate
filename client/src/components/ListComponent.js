import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Row,  Media} from 'react-bootstrap';	
import Icon from 'react-icons-kit';
import { pen } from 'react-icons-kit/icomoon/pen';
import { eye} from 'react-icons-kit/icomoon/eye';
import { starEmpty} from 'react-icons-kit/icomoon/starEmpty';	
		
class ListComponent extends React.Component {
				render(){
					return(
					     <div class="col-12 col-lg-12 mb-15 mt-15">
							<div className="single-blog-post post-style-4 d-flex align-items-center wow fadeInUpBig" data-wow-delay="0.2s">
         
                            <div className="post-thumbnail">
                                <img src="http://via.placeholder.com/120x180" alt=""/>
                            </div>
                        
                            <div className="post-content">
                                <Link to={`/book/${this.props.book.slug}`}  className="headline">
                                    <h5>{this.props.book.title}</h5>
                                </Link>
								<h6><Icon size={14} icon={eye}/> 3.4k <Icon size={14} icon={starEmpty}/> 4.6 </h6>
                                <p> unripened...</p>
                                <div className="post-meta">
                                    <p><Icon size={14} icon={pen}/><Link to={`/`} className="post-author">{this.props.book.author.username}</Link> on <Link to={`/`} className="post-date">Sep 29, 2017 at 9:48 am</Link></p>
                                </div>
                            </div>
                        </div>
					</div>
						)
						}
						}
						
export default ListComponent;
