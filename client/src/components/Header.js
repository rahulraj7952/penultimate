import React, {Component} from "react";
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import NavItem from 'react-bootstrap/lib/NavItem';		
import {Row, Col, Grid ,Media, Image,} from 'react-bootstrap';
import {
  Link
} from "react-router-dom";
import { SET_NOTIFICATION_COUNT } from '../constants/actionTypes';
import {connect} from 'react-redux';
import agent from './../agent';
import moment from 'moment';


const mapStateToProps = state => {
  return {
    notifications:state.common.notifications,
    notificationCount:state.common.notificationCount
  }};								

const mapDispatchToProps = dispatch => ({
  onSetNotificationCount:(count)=>
	dispatch({type: SET_NOTIFICATION_COUNT, count})

});


const Notification=props =>{
	if(props.notification){
	var notificationMessage=props.notification.from.username+" "+props.notification.verb;
	
	var time=moment(props.notification.createdAt).fromNow();
	return(

		<div className="col-12 col-lg-12">
							<div className="single-blog-post post-style-2 d-flex align-items-center wow fadeInUpBig" data-wow-delay="0.2s">
         
                            <div className="post-thumbnail">
                                <img className ="img-circle" src="http://via.placeholder.com/60x60" alt="" />
                            </div>
                        
                            <div className="post-content">
                                <Link to={`/book/${props.notification.link}`}  className="headline">
                                    <p><b>{notificationMessage}</b></p>
                                    <p><i>{time}</i></p>
                                </Link>
                            </div>
                        </div>
                   </div>
	
	
	)
	
	
}
else return null;
	}					

const LoggedOutView=props=>{
	if(!props.currentUser){
		return(
		<header className="header-area mb-50">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg">
                        <Link to="/" className="nav-link">LetterShack</Link>
                       
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#worldNav" aria-controls="worldNav" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                       
                        <div className="collapse navbar-collapse" id="worldNav">
                            <ul className="navbar-nav ml-auto">
                            
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/signup" className="nav-link">Sign Up</Link>
                                </li>
                               
                            </ul>
                            <div id="search-wrapper">
                                <form action="#">
                                    <input type="text" id="search" placeholder="Search something..."/>
                                    <div id="close-icon"></div>
                                    <input className="d-none" type="submit" value=""/>
                                </form>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    </header>
		
		)
		
}
return null;
}

class LoggedInView extends React.Component{
	render(){
	if(this.props.currentUser){	
		console.log("logged IN ", this.props.notifications);
		var message=this.props.notifications?this.props.notifications.map(notification => <Notification notification={notification}/>):"all"
		var newNotificationCount=(this.props.notificationCount>0)?<span class="badge badge-light">{this.props.notificationCount}</span>:""
		
		return(
		
    <header className="default-header">
        
            <div className="row">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container">
                        <Link to="/" className="nav-link">LetterShack</Link>
                       
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#worldNav" aria-controls="worldNav" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                       
                        <div className="collapse navbar-collapse justify-content-end align-items-center" id="worldNav">
                            <ul className="navbar-nav">
                                <li className="nav-item ">
                                    <Link to="myworks" className="nav-link">Write </Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Find</a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link to="/listing/agents" className="dropdown-item" >Agents</Link>
                                        <Link to="/listing/agents"className="dropdown-item" >Publisher</Link>
                                        <Link to="/listing/agents" className="dropdown-item">Editors</Link>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Browse</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" onClick={()=> this.props.removeNotificationCount()} role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Notifications{newNotificationCount}</a>
									<div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                       {message}
                                    </div>
                                </li>
                                <li className="nav-item">
                                <Link to={`/@${this.props.currentUser.username}`} className="nav-link">
									<img src={this.props.currentUser.image} className="user-pic"  />
								<strong>{this.props.currentUser.username}</strong>
								</Link>
								</li>
                                <li className="nav-item">
                                    <Link to="/settings" className="nav-link">Settings</Link>
                                </li>
                               
                            </ul>
                            <div id="search-wrapper">
                                <form action="#">
                                    <input type="text" id="search" placeholder="Search something..."/>
                                    <div id="close-icon"></div>
                                    <input className="d-none" type="submit" value=""/>
                                </form>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </header>
		)}
		
		else return null;
		}
	}
		


class Header extends React.Component{
	constructor(){
		super()
		
		this.removeNotificationCount=this.removeNotificationCount.bind(this)
		
		}
	
    removeNotificationCount(){
		
		if(this.props.notificationCount>0){
			agent.Notifications.markRead();
		this.props.onSetNotificationCount(0);
	}
		}
    
	render(){
		console.log("header", this.props.notifications.length)
		var count =0;
		if (this.props.notifications.length>0){
			this.props.notifications.forEach(notification=>{if(notification.readState==false){
			console.log("increasing count");
			count++;}})
		if(count>0){this.props.onSetNotificationCount(0)}
	}
		return(
		 <nav className="navbar navbar-light">
          <Link to="/" className="navbar-brand"></Link>
          <LoggedOutView currentUser={this.props.currentUser} />
          <LoggedInView currentUser={this.props.currentUser} 
						notifications={this.props.notifications}
						removeNotificationCount={this.removeNotificationCount}
						notificationCount={this.props.notificationCount}/>
		 </nav>
			)
		}
	}
	
	export default connect(mapStateToProps, mapDispatchToProps)(Header);
