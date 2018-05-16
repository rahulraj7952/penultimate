import React, {Component} from "react";
import {
  Route,
  Switch
} from "react-router-dom";

import Dashboard from './Dashboard/dashboard';
import HomePage from './Homepage/HomePage';
import MyEditor2 from './Editor';
import MyEditor from './Editor2';
import Article from './Article';
import BookView from './BookView';
import Profile from './Profile';
import Login from './Login';
import Listpage from './Listpage';
import Header from './Header';
import Register from './Register';
import EditorForChapter from './EditorForChapter'
import Settings from './Settings';
import Listing from './Listing';
import DraftEditor from './DraftEditor';
import agent from '../agent';
import MyWorks from './MyWorks';
import MyBook from './MyBook';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT, NEW_NOTIFICATION, SET_NOTIFICATION_COUNT } from '../constants/actionTypes';
import { store } from '../store';
import { push } from 'react-router-redux';
import Pusher from 'pusher-js';
						
const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo,
    notifications:state.common.notifications
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
    console.log("token", token)
	const res=token?( await Promise.all([agent.Auth.current(), agent.Notifications.get()])):null
     this.props.onLoad(res, token);
    
         var channel;
	  
			console.log("print", this.props.currentUser.id)
			channel= this.pusher.subscribe("my-channel-"+this.props.currentUser.id);
				channel.bind('post', data => {
					console.log("data",data.link);
				this.props.onNewNotification(data);
				
	},this);
  } 
  

  
  
 
	
render(){
	
	if (this.props.appLoaded) {
		Pusher.logToConsole = true;
return(	
		
	
		
	    <div>
	    <Header currentUser={this.props.currentUser} notifications={this.props.notifications}/>
	    <Switch>
    	<Route path ="/write2" component={MyEditor2}/>
    	<Route path ="/write/:chapter" component={EditorForChapter}/>
    	<Route path ="/write" component={MyEditor}/>
		<Route path="/dashboard" component={Dashboard}/>
		<Route path="/article/:id" component={Article} />
		<Route path="/book/:id" component={BookView}/>
		<Route path="/genre/:id" component={Listpage} />
		<Route path="/listing/:id" component={Listing}/>
		<Route path="/@:username" component={Profile} />
		<Route path= "/login" component={Login}/>
		<Route path="/signup" component={Register}/>
		<Route path="/settings" component={Settings}/>
		<Route path="/myworks/:book" component={MyBook}/>
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

