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
			
			const genre1=this.props.genre1?<span><MultipleItemCarousel title={"Recent Uploads"} books={this.props.genre1.books}/>
						<MultipleItemCarousel title={"Picks of the month"} books={this.props.genre1.books}/>
						<MultipleItemCarousel title={"Picks of the week"} books={this.props.genre1.books}/></span>:"Loading bro"
						
			 
		return(
			<section class="travel-area section-gap" id="travel">
				<div class="container">
				<div class="row">
						<div class="col-lg-3 col-md-6 single-fashion">
							<img class="img-fluid" src="img/f1.jpg" alt=""/>
							<p class="date">10 Jan 2018</p>
							<h4><a href="#">Addiction When Gambling
							Becomes A Problem</a></h4>
							<p>
								inappropriate behavior ipsum dolor sit amet, consectetur.
							</p>
							<div class="meta-bottom d-flex justify-content-between">
								<p><span class="lnr lnr-heart"></span> 15 Likes</p>
								<p><span class="lnr lnr-bubble"></span> 02 Comments</p>
							</div>									
						</div>
						<div class="col-lg-3 col-md-6 single-fashion">
							<img class="img-fluid" src="img/f2.jpg" alt=""/>
							<p class="date">10 Jan 2018</p>
							<h4><a href="#">Addiction When Gambling
							Becomes A Problem</a></h4>
							<p>
								inappropriate behavior ipsum dolor sit amet, consectetur.
							</p>
							<div class="meta-bottom d-flex justify-content-between">
								<p><span class="lnr lnr-heart"></span> 15 Likes</p>
								<p><span class="lnr lnr-bubble"></span> 02 Comments</p>
							</div>									
						</div>
						<div class="col-lg-3 col-md-6 single-fashion">
							<img class="img-fluid" src="img/f3.jpg" alt=""/>
							<p class="date">10 Jan 2018</p>
							<h4><a href="#">Addiction When Gambling
							Becomes A Problem</a></h4>
							<p>
								inappropriate behavior ipsum dolor sit amet, consectetur.
							</p>
							<div class="meta-bottom d-flex justify-content-between">
								<p><span class="lnr lnr-heart"></span> 15 Likes</p>
								<p><span class="lnr lnr-bubble"></span> 02 Comments</p>
							</div>									
						</div>
						<div class="col-lg-3 col-md-6 single-fashion">
							<img class="img-fluid" src="img/f4.jpg" alt=""/>
							<p class="date">10 Jan 2018</p>
							<h4><a href="#">Addiction When Gambling
							Becomes A Problem</a></h4>
							<p>
								inappropriate behavior ipsum dolor sit amet, consectetur.
							</p>
							<div class="meta-bottom d-flex justify-content-between">
								<p><span class="lnr lnr-heart"></span> 15 Likes</p>
								<p><span class="lnr lnr-bubble"></span> 02 Comments</p>
							</div>									
						</div>	
							<hr/>				
					</div>
					<div class="row d-flex justify-content-center">
						<div class="menu-content mt-50 pb-50 col-lg-8">
							<div class="title text-center">
								<h1 class="mb-10">Hot topics from Travel Section</h1>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore  et dolore magna aliqua.</p>
							</div>
						</div>
					</div>	
                        
                    {genre1}
                    <h4 className="mt-15"> Featured Books</h4>
                    <div class="top-posts">
                            <div class="container">
                                <div class="row">   
                    {homePagePosts}
                    </div>
                    </div>
                    </div>
                </div>
					{/*<Sidebar/>*/}
            
				<Footer/>
			</section>
    	)
    	
	}
	}
	
	export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
