import React, {Component} from "react";
import {
  Route,
  Link,
  Switch
} from "react-router-dom";

import {Grid, Col} from 'react-bootstrap';
import Dashboard from './Dashboard/dashboard';
import HomePage from './Homepage/HomePage';
import ShortStories from './ShortStories';
import MyEditor from './Editor';
import Article from './Article';
import Book from './Dashboard/Book';
import Profile from './Profile';
import Login from './Login';
import Listpage from './Listpage';
import Header from './Header';
import Register from './Register';
import Settings from './Settings';
import Listing from './Listing';
import DraftEditor from './DraftEditor';
import agent from '../agent';
import MyWorks from './MyWorks'
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT, NEW_NOTIFICATION } from '../constants/actionTypes';
import { store } from '../store';
import { push } from 'react-router-redux';
import Pusher from 'pusher-js';
						
const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
  }};								

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () =>
    dispatch({ type: REDIRECT }),
  
  onNewNotification:(data)=>
	dispatch({type: NEW_NOTIFICATION, data})
});

class App extends React.Component{
	 constructor(){
        super();
         this.state = {
          posts : []
        }	
		this.pusher = new Pusher("5e2ba289c6b150773bd4", {
         cluster: 'ap2',
         encrypted: true
        });    
	}
	
	componentWillReceiveProps(nextProps) {
   if (nextProps.redirectTo) {
      //this.context.router.replace(nextProps.redirectTo);
     store.dispatch(push(nextProps.redirectTo));
     this.props.onRedirect();
   }
  }
   async componentWillMount() {
	   
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }
	const res=token? await agent.Auth.current():null
     this.props.onLoad(res, token);
    console.log("in willmount")
     var channel;
	  
			console.log("print", this.props.currentUser.id)
			channel= this.pusher.subscribe("my-channel-"+this.props.currentUser.id);
				channel.bind('post', data => {
					console.log("data",data.message);
				this.setState({ posts: this.state.posts.concat(data)});
				
	},this);
  } 
  
  
  
 componentDidMount(){
	 
	 
	 
	  }
	
render(){
	
	console.log("posts", this.state.posts)
	if (this.props.appLoaded) {
		Pusher.logToConsole = true;
	  console.log(this.props.appName);
			if(this.props.currentUser){
				
				
				

	
}
	
		
		
return(	
		
	
		
	    <div>
	    <Header currentUser={this.props.currentUser} notifications={this.state.posts}/>
	    <Switch>
    	<Route path ="/short-stories" component = {ShortStories}/>
    	<Route path ="/write" component={MyEditor}/>
		<Route path="/dashboard" component={Dashboard}/>
		<Route path="/book" component={Book}/>
		<Route path="/article/:id" component={Article} />
		<Route path="/genre/:id" component={Listpage} />
		<Route path="/listing/:id" component={Listing}/>
		<Route path="/@:username" component={Profile} />
		<Route path= "/login" component={Login}/>
		<Route path="/signup" component={Register}/>
		<Route path="/settings" component={Settings}/>
		<Route path="/myworks" component={MyWorks} />
		<Route path="/editor" component={DraftEditor}/>
		<Route exact path="/" component={HomePage}/>
		</Switch>
 
    </div>
)
}
else
return (
      <div>
        <Header/>
      </div>
      )
}
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

