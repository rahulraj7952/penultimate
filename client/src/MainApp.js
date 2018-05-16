	import React, {Component} from "react";
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import {
  Route,
  Switch
} from "react-router-dom";
import { store, history} from './store';
import App from './components/App';

class MainApp extends React.Component{

  
    render(){   
    return(
  <Provider store={store}>
  <ConnectedRouter history={history}>
    <div>
      
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </div>
  </ConnectedRouter>
  </Provider>
)
}}

export default MainApp;
