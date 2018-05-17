import React, { Component } from 'react';
import { Col} from 'react-bootstrap';
import {Link} from 'react-router-dom'
//import './HomePageStyle.css';

class HomePageCard extends React.Component{
		
	
	render(){
		
		//const htmlString = this.props.note.contentState;
		//const Content= () => (
  //<div dangerouslySetInnerHTML={{ __html: htmlString }} />
  //);
		return(                 
				
                                        <div className="col-12 col-lg-12 mb-15 mt-15">
                                           
                                            <div className="single-blog-post post-style-4 d-flex align-items-center wow fadeInUpBig" data-wow-delay="0.2s">
                                               
                                                <div className="post-thumbnail">
                                                    <img src="http://via.placeholder.com/150x225"  alt=""/>
                                                    
                                                    <div className="post-cta"><a href="#">{this.props.book.genre}</a></div>
                                                </div>
                                               
                                                <div className="post-content">
                                                    <Link to='/' className="headline">
                                                        <h5>{this.props.book.title}</h5>
                                                    </Link>
                                                    <p>1208How Did van Gogh’s Turbulent Mind Depict One of thein...</p>
                                              
                                                    <div className="post-meta">
                                                        <p><Link to="/" className="post-author">{this.props.book.author.username}</Link> on <Link to="/" className="post-date">{this.props.book.createdAt}</Link></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                          
                             
				)
			}
		}
export default HomePageCard;
