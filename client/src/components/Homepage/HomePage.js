import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import {Carousel, Row, Col, Grid, Media} from 'react-bootstrap';
import axios from 'axios';
import HomePageCard from './HomePageCard';
import './HomePageStyle.css';
import {connect} from 'react-redux';
import MultipleItemCarousel from '../MultipleItemCarousel';
import agent from '../../agent';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
} from '../../constants/actionTypes';
import Icon from 'react-icons-kit';
import { pen } from 'react-icons-kit/icomoon/pen';
import { eye} from 'react-icons-kit/icomoon/eye';
import { starEmpty} from 'react-icons-kit/icomoon/starEmpty';

const mapStateToProps = state => ({
	
  ...state.home,
  ...state.common,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>{
    dispatch({ type: HOME_PAGE_LOADED, payload })},
  onUnload: () =>
    dispatch({  type: HOME_PAGE_UNLOADED })
});



class HomePage extends React.Component{
	
 componentWillMount() {
	 console.log(this.props.currentUser)
  this.props.onLoad(Promise.all([
      agent.Articles.byGenre("horror"),
      agent.Articles.byAuthor("person1")
    ]));
  }


	render(){
		
			const homePagePosts=this.props.homePagePosts.articles?this.props.homePagePosts.articles.map(note => <div><HomePageCard note={note} key={note.slug}/></div>):"loading bro"
			
			const genre1=this.props.genre1?<span><MultipleItemCarousel title={"Recommended"} title= "Recommended" articles={this.props.genre1.articles}/>
						<MultipleItemCarousel title={"Horror"} title = "Horror" articles={this.props.genre1.articles}/>
						<MultipleItemCarousel title={"Adventure"} title ="Adventure" articles={this.props.genre1.articles}/></span>:"Loading bro"
						
			 
		return(
				<div className="homepage-container">
			{/*	<Grid>
					<Col>
						<div className="wrapper" >
							<img  className="mainpage-picture" src="http://via.placeholder.com/1300x300"/>
							<div className="description">
								<p class='description_content'>Get Discovered</p>
							</div>
												
						</div>					
					<hr/>
					</Col>
				</Grid>	*/}
				
				<Grid>
					<Row className="main-container">
						<Col md={6}>
							<h4>Featured</h4>
							<hr/>	
							 <Media>
								
								<Media.Body>
								<Col>
								<Media.Heading>Media Heading</Media.Heading>
								
								<h5><Icon size={14} icon={pen}/> Joe Root</h5>
								<h5> #3 in Fantasy </h5>
								<h6><Icon size={14} icon={eye}/> 3.4k <Icon size={14} icon={starEmpty}/> 4.6 </h6>
								<br/>
								
								<p>	Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante 
								sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,tempus viverra 
								turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue 
								felis in faucibus ras sit amet nibh libero, in gravida nulla. 
								</p>
								</Col>
								</Media.Body>
									<Media.Right>
									<img width={200} height={300} src="https://99designs-blog.imgix.net/wp-content/uploads/2017/12/attachment_83090027.jpg?auto=format&q=60&fit=max&w=930" alt="thumbnail" />
								</Media.Right>
							</Media>
							<hr/>
						</Col>
						<Col md={3}>
							<h5>Trending</h5>
							 <Media>
								
								<Media.Body>
								<h4>Media Heading </h4>
								<h6> by Joe Root </h6>
								
								<p>	Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante 
								sollicitudin commodo.
								</p>
								</Media.Body>
								<Media.Right>
									<img width={100} height={150} src="http://wordwenches.typepad.com/.a/6a00d8341c84c753ef0176159a1195970c-800wi" alt="thumbnail" />
								</Media.Right>
							</Media>
							<Media>
								
								<Media.Body>
								<h4>Media Heading </h4>
								<h6></h6>
								
								<p>	Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante 
								</p>
								</Media.Body>
								<Media.Right>
									<img width={100} height={150} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR4wFJXpH6kQTt6gWGzhWF8TBqupVo7ZER6xaWrSaQaMRD5msMig" alt="thumbnail" />
								</Media.Right>
							</Media>
						</Col>
						<Col md={3}>
							<h5>Top of the Charts</h5>
							 <Media>
								
								<Media.Body>
								<h5>Media Heading </h5>
								<h6> by Joe Root </h6>
								
								<p>Last Update:	Agents page updated
								</p>
								</Media.Body>
							</Media>
							<Media>
								
								<Media.Body>
								<h5>Media Heading </h5>
								<h6> by Joe Root </h6>
								
								<p>	Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante 
								</p>
								</Media.Body>
								
							</Media>
							<Media>
								
								<Media.Body>
								<h5>Media Heading </h5>
								<h6> by Joe Root </h6>
								
								<p>	Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante 
								</p>
								</Media.Body>
								
							</Media>
						</Col>
						
						
					</Row>
					<Row>	
						{genre1}
					</Row>
				</Grid>		
				<Grid>
					<hr/>
					<Row>
						<Col>
							<p className="mainpage-subheading"> Featured Articles</p>
						</Col>
						
					</Row>
					<br/>
        			<ul>
        			 {homePagePosts}
      		</ul>
      			
      			
				<br/>
					
				</Grid>
				
				</div>
				

    	
    	)
    	
	}
	}
	
	export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
