import React, { Component } from 'react';
import { Col} from 'react-bootstrap';
import {Link} from 'react-router-dom'


class HomePageCard extends React.Component{
		
	
	render(){
		
		//const htmlString = this.props.note.contentState;
		//const Content= () => (
  //<div dangerouslySetInnerHTML={{ __html: htmlString }} />
  //);
		return(               
				
                                        <div className="single-posts cl-12 col-lg-12 mt-15 mb-30">   
                                                    <img className="img-fluid" src="img/asset/p1.jpg"  alt=""/>
                                                    
                                                    <div class="date mt-20 mb-20">10 Jan 2018</div>
													<Link to={`/book/${this.props.book.slug}` }className="text-uppercase">
                                                        <h5>{this.props.book.title}</h5>
                                                    </Link>
                                                    </div>
                             
                                            
                                    
                                              
                          
                             
				)
			}
		}
export default HomePageCard;
