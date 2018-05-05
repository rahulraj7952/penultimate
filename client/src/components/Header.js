import React, {Component} from "react";
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import NavItem from 'react-bootstrap/lib/NavItem';		
import {Row, Col, Grid , FormGroup, FormControl,Media, Image, Button} from 'react-bootstrap';
import './HeaderStyle.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import ShortStories from './ShortStories';
import MyEditor from './MyEditor';
import Dropdown from './Dropdown';
import { bell} from 'react-icons-kit/icomoon/bell';
import Icon from 'react-icons-kit';

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
    			<Nav>
					<NavItem eventKey={1}>
						<Link to='/short-stories'>
        					Short Stories
						</Link>
					</NavItem>
    			</Nav>
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

const LoggedInView=props =>{
	if(props.currentUser){
		return(
			<div className= "HeaderContainer" >  
			<Navbar collapseOnSelect className="Menutab">
  				<Navbar.Header>
    				<Navbar.Brand >
      				<Link to="/" className="link"> penUltimate</Link>
    				</Navbar.Brand>
    				<Navbar.Toggle />
  				</Navbar.Header>
  				<Navbar.Collapse>
    			<Nav>
					<NavItem>
						<Link to='/write'className="link">
							Write
						</Link>
					</NavItem>
					<NavDropdown title="Find" id="basic-nav-dropdown" >
					
					
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
					<NavDropdown title="Browse" id="basic-nav-dropdown" 	>
					
					<Row className="dropdown-multi">
						<Col md={6} className="dropdown-link"> 
							<MenuItem className="dropdown-link">
								<Link to='/short-stories' className="link">	Short Stories</Link>
							</MenuItem>
							<MenuItem className="dropdown-link" className="link">	
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
								<Link to='/genre/Fantasy' className="link">	Fantasy</Link>
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
                        <Icon size={18} icon={bell}/>
                    </div>} id="basic-nav-dropdown" >
						<MenuItem className="notification-card">
								<div >
									<Media>
										<Media.Left>
											<Image width={48} height={48} src="http://www.fiat500owners.com/forum/attachment.php?attachmentid=4220&d=1461347917" alt="thumbnail" circle/>
										</Media.Left>
										<Media.Body>
											
												<p>Nakul Yadav posted a new story.</p>
												<p><i>1 minute ago</i></p>
										</Media.Body>
									</Media>
								</div>
						</MenuItem>
						<MenuItem className="notification-card">
								<div >
									<Media>
										<Media.Left>
											<Image width={48} height={48}  src="https://static.toiimg.com/photo/61261856.cms" alt="thumbnail" circle/>
										</Media.Left>
										<Media.Body>
											
												<p>Sunny Leone posted a new video.</p>	
												<p><i>19 minutes ago</i></p>
										</Media.Body>
									</Media>
								</div>
						</MenuItem>
					
					
							
					</NavDropdown>
					
					
					
					<NavItem>
						<Link to={`/@${props.currentUser.username}`} className="link">
							<img src={props.currentUser.image} className="user-pic"  />
								{props.currentUser.username}
						</Link>
      				</NavItem>
					
					<NavItem>
						<Link to='/settings' className="link">
							Settings
						</Link>
					</NavItem>
				</Nav>
  				</Navbar.Collapse>																	
			</Navbar>
					
		</div>	
		
		
		)}
		
		return null;
		}
		


class Header extends React.Component{
	 
     
    
	render(){
		return(
		 <nav className="navbar navbar-light">
          <Link to="/" className="navbar-brand"></Link>
          <LoggedOutView currentUser={this.props.currentUser} />
          <LoggedInView currentUser={this.props.currentUser} />
		 </nav>
			)
		}
	}
	
	export default Header;
