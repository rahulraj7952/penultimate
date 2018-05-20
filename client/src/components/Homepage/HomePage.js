import React, { Component } from 'react';
import { Row, Col, Grid, Media} from 'react-bootstrap';
import HomePageCard from './HomePageCard';
import {connect} from 'react-redux';
import MultipleItemCarousel from '../MultipleItemCarousel';
import Sidebar from '../Sidebar'
import agent from '../../agent';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  NEW_NOTIFICATION,
  SET_NOTIFICATION_COUNT
} from '../../constants/actionTypes';
import Footer from '../Footer'



const mapStateToProps = state => ({
	
  ...state.home,
  ...state.common,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>{
    dispatch({ type: HOME_PAGE_LOADED, payload })},
  onUnload: () =>
    dispatch({  type: HOME_PAGE_UNLOADED }),
  onNotification:(payload)=>
	dispatch({type: NEW_NOTIFICATION, payload}),
  onSetNotificationCount:(count)=>
	dispatch({type: SET_NOTIFICATION_COUNT, count})
});



class HomePage extends React.Component{
	
 async componentWillMount() {
	 console.log("homepage", this.props.token)

	const request=Promise.all([agent.Books.byGenre("horror"),agent.Books.byAuthor("rahulraj")])
  this.props.onLoad(request);
  if (this.props.token){
	  if(this.props.notifications.length==0){
		  
		  
  this.props.onNotification(agent.Notifications.get());
  
		
  
}
  }
  
  }


	render(){
		
			const homePagePosts=this.props.homePageBooks.books?this.props.homePageBooks.books.map(book => <span><HomePageCard book={book} key={book.slug}/></span>):"loading bro"
			
			const genre1=this.props.genre1?<span><MultipleItemCarousel title={"Recommended"} books={this.props.genre1.books}/>
						<MultipleItemCarousel title={"Horror"} books={this.props.genre1.books}/>
						<MultipleItemCarousel title={"Adventure"} books={this.props.genre1.books}/></span>:"Loading bro"
						
			 
		return(
			<span>
			<div className="main-content-wrapper ">
        <div className="container " >
            <div className="row justify-content-center ">
                <div className="col-12 col-lg-8 mt-50">
                    <div className="post-content-area mb-50">
                        <div className="world-catagory-area">

                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                                <div className="single-blog-post">
                                                    
                                                    <div className="post-thumbnail">
                                                        <img src="img/blog-img/b1.jpg" alt=""/>
                                                        
                                                        <div className="post-cta"><a href="#">travel haha 205</a></div>
                                                    </div>
                                                 
                                                    <div className="post-content">
                                                        <a href="#" className="headline">
                                                            <h5>209 How Did van Gogh’s Turbulent Mind Depict One of the Most Complex Concepts in Physics?</h5>
                                                        </a>
                                                        <p>How Did van Gogh’s Turbulent Mind Depict One of the Most Complex Concepts in...</p>
                                                   
                                                        <div className="post-meta">
                                                            <p><a href="#" className="post-author">Katy Liu</a> on <a href="#" className="post-date">Sep 29, 2017 at 9:48 am</a></p>
                                                        </div>
                                                    </div>
                                                </div>

                                      
                                        </div>

                                        <div className="col-12 col-md-6">
                                        
                                            <div className="single-blog-post post-style-2 d-flex align-items-center wow fadeInUpBig" data-wow-delay="0.2s">
                                             
                                                <div className="post-thumbnail">
                                                    <img src="img/blog-img/b10.jpg" alt=""/>
                                                </div>
                                            
                                                <div className="post-content">
                                                    <a href="#" className="headline">
                                                        <h5>274How Did van Gogh’s Turbulent Mind Depict One of the Most</h5>
                                                    </a>
                                               
                                                    <div className="post-meta">
                                                        <p><a href="#" className="post-author">Katy Liu</a> on <a href="#" className="post-date">Sep 29, 2017 at 9:48 am</a></p>
                                                    </div>
                                                </div>
                                            </div>

                                         
                                            <div className="single-blog-post post-style-2 d-flex align-items-center wow fadeInUpBig" data-wow-delay="0.3s">
                                            
                                                <div className="post-thumbnail">
                                                    <img src="img/blog-img/b11.jpg" alt=""/>
                                                </div>
                                             
                                                <div className="post-content">
                                                    <a href="#" className="headline">
                                                        <h5>291How Did van Gogh’s Turbulent Mind Depict One of the Most</h5>
                                                    </a>
                                              
                                                    <div className="post-meta">
                                                        <p><a href="#" className="post-author">Katy Liu</a> on <a href="#" className="post-date">Sep 29, 2017 at 9:48 am</a></p>
                                                    </div>
                                                </div>
                                            </div>

                                            
                                            <div className="single-blog-post post-style-2 d-flex align-items-center wow fadeInUpBig" data-wow-delay="0.4s">
                                             
                                                <div className="post-thumbnail">
                                                    <img src="img/blog-img/b12.jpg" alt=""/>
                                                </div>
                                            
                                                <div className="post-content">
                                                    <a href="#" className="headline">
                                                        <h5>How Did van Gogh’s Turbulent Mind Depict One of the Most</h5>
                                                    </a>
                                                
                                                    <div className="post-meta">
                                                        <p><a href="#" className="post-author">Katy Liu</a> on <a href="#" className="post-date">Sep 29, 2017 at 9:48 am</a></p>
                                                    </div>
                                                </div>
                                            </div>

                                          
                                            <div className="single-blog-post post-style-2 d-flex align-items-center wow fadeInUpBig" data-wow-delay="0.5s">
                                             
                                                <div className="post-thumbnail">
                                                    <img src="img/blog-img/b13.jpg" alt=""/>
                                                </div>
                                              
                                                <div className="post-content">
                                                    <a href="#" className="headline">
                                                        <h5>How Did van Gogh’s Turbulent Mind Depict One of the Most</h5>
                                                    </a>
                                                
                                                    <div className="post-meta">
                                                        <p><a href="#" className="post-author">332 Katy Liu</a> on <a href="#" className="post-date">Sep 29, 2017 at 9:48 am</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                    
                                </div>
                            </div>      
                        </div>
                    </div>
                    {genre1}
                    <h4 className="mt-15"> Featured Books</h4>
                    {homePagePosts}
                </div>
					<Sidebar/>
            </div>  
        </div>
    </div>
				<Footer/>
			</span>
    	)
    	
	}
	}
	
	export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
