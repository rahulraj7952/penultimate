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
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT } from '../constants/actionTypes';
import { store } from '../store';
import { push } from 'react-router-redux';
						
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
    dispatch({ type: REDIRECT })
});

class App extends React.Component{
	
	componentWillReceiveProps(nextProps) {
   if (nextProps.redirectTo) {
      //this.context.router.replace(nextProps.redirectTo);
     store.dispatch(push(nextProps.redirectTo));
     this.props.onRedirect();
   }
  }
  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }
	
render(){
	if (this.props.appLoaded) {
return(	

		
	    <div>
	    <Header currentUser={this.props.currentUser}/>
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
		<Route path="/editor" component={DraftEditor}/>
		<Route exact path="/" component={HomePage}/>
		</Switch>
 
    </div>
)
}
return (
      <div>
        <Header/>
      </div>
      )
}
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

