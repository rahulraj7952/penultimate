import React, {Component} from "react";
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import NavItem from 'react-bootstrap/lib/NavItem';		
import {Row, Col, Grid ,Media, Image,} from 'react-bootstrap';
import './HeaderStyle.css';
import {
  Link
} from "react-router-dom";
import { bell} from 'react-icons-kit/icomoon/bell';
import Icon from 'react-icons-kit';
import { SET_NOTIFICATION_COUNT } from '../constants/actionTypes';
import {connect} from 'react-redux';
import agent from './../agent';
import moment from 'moment';


const mapStateToProps = state => {
  return {
    
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
	console.log("time",time)
	return(
	<MenuItem className="notification-card">
								<div>
									<Media>
										<Media.Left>
											<Image width={48} height={48} src="http://www.fiat500owners.com/forum/attachment.php?attachmentid=4220&d=1461347917" alt="thumbnail" circle/>
										</Media.Left>
										<Media.Body>
											<Link to={`/article/${props.notification.slug}`}>
												<p><b>{notificationMessage}</b></p>
												<p><i>{time}</i></p>
											</Link>
										</Media.Body>
									</Media>
								</div>
						</MenuItem>
	)
}
else return null;
	}					

const LoggedOutView=props=>{
	if(!props.currentUser){
		return(
		<div className= "HeaderContainer" >  
			<Navbar collapseOnSelect className="Menutab">
  				<Navbar.Header>
    				<Navbar.Brand>
      				<Link to="/"> penUltimate</Link>
    				</Navbar.Brand>
    				<Navbar.Toggle />
  				</Navbar.Header>
  				<Navbar.Collapse>
    			
    			<Nav pullRight>
					<NavItem eventKey={1} >
						<Link to='/signup'>
							SignUp
						</Link>
      				</NavItem>
					<NavItem eventKey={2} href="#">
						<Link to='/login'>
							SignIn
						</Link>
					</NavItem>
				</Nav>
  				</Navbar.Collapse>																	
			</Navbar>
					
		</div>	
		
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
			<div className= "HeaderContainer" >  
			<Navbar collapseOnSelect className="Menutab">
  				<Navbar.Header>
    				<Navbar.Brand >
      				<Link to="/" className="link"> <strong>penUltimate</strong></Link>
    				</Navbar.Brand>
    				<Navbar.Toggle />
  				</Navbar.Header>
  				<Navbar.Collapse>
    			<Nav>
					<NavItem>
						<Link to='/myworks'className="link">
							<strong>Write</strong>
						</Link>
					</NavItem>
					<NavDropdown title={<span className="link"><strong>Find</strong> </span>} id="basic-nav-dropdown"  >
					
					
							<MenuItem>
								<Link to='/listing/agents' className="link" >Agents</Link>
							</MenuItem>
							<MenuItem >
								<Link to='/listing/publishers' className="link">Publishers</Link>
							</MenuItem>
							<MenuItem >
								<Link to='/listing/editors' className="link">Editors</Link>
							</MenuItem>
					</NavDropdown>
					<NavDropdown title={<span className="link"><strong>Browse</strong> </span>} id="basic-nav-dropdown" 	>
					
					<Row className="dropdown-multi">
						<Col md={6} className="dropdown-link"> 
							<MenuItem className="dropdown-link">
								<Link to='/genre/thriller' className="link">	Short Stories</Link>
							</MenuItem>
							<MenuItem className="dropdown-link">	
								<Link to='/genre/adventure' className="link">Adventure</Link>
							</MenuItem>
							<MenuItem >
								<Link to='/genre/comedy' className="link">Comedy</Link>
							</MenuItem>
							<MenuItem >
								<Link to='/genre/drama' className="link">	Drama</Link>
							</MenuItem>
							<MenuItem >
								<Link to='/genre/horror' className="link">	Horror</Link>
							</MenuItem>
							<MenuItem divider />
							<MenuItem >
								<Link to='/genre/satire' className="link">	Satire</Link>
							</MenuItem>
							<MenuItem >
								<Link to='/genre/screenplay' className="link">	Screenplay</Link>
							</MenuItem>
						</Col>
						<Col md={6}>
							<MenuItem >
								<Link to='/genre/tragedy' className="link">	Tragedy</Link>
							</MenuItem>
							<MenuItem >
								<Link to='/genre/fantasy' className="link">	Fantasy</Link>
							</MenuItem>
							<MenuItem >
								<Link to='/genre/mythology' className="link">	Mythology</Link>
							</MenuItem>
							<MenuItem >
								<Link to='/genre/romance' className="link">	Romance</Link>
							</MenuItem>
							<MenuItem >
								<Link to='/genre/mystery' className="link">	Mystery</Link>
							</MenuItem>
							<MenuItem divider />
							<MenuItem >
								<Link to='/genre/plays' className="link">	Plays</Link>
							</MenuItem>
							<MenuItem >
								<Link to='/genre/poetry' className="link">	Poetry</Link>
							</MenuItem>
						</Col>
					</Row>
					
					</NavDropdown>
    			</Nav>
    			<Nav pullRight>
					<NavDropdown title={
                    <div className="pull-left">
                        <Icon size={18} icon={bell}/>{newNotificationCount}
                    </div>} id="basic-nav-dropdown"  onClick={()=> this.props.removeNotificationCount()}>
						  {message}

							
					</NavDropdown>
					
					
					
					<NavItem>
						<Link to={`/@${this.props.currentUser.username}`} className="link">
							<img src={this.props.currentUser.image} className="user-pic"  />
								<strong>{this.props.currentUser.username}</strong>
						</Link>
      				</NavItem>
					
					<NavItem>
						<Link to='/settings' className="link">
							<strong>Settings</strong>
						</Link>
					</NavItem>
				</Nav>
  				</Navbar.Collapse>																	
			</Navbar>
					
		</div>	
		
		
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
		console.log("header", this.props.notifications)
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
