import React from 'react';
import agent from '../agent';
import {Col, Grid} from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  LIST_PAGE_LOADED,
  LIST_PAGE_UNLOADED
} from '../constants/actionTypes';
import ListComponent from './ListComponent';
import "./List.css"

const mapStateToProps = state => ({
  ...state.listpage,
  currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => {console.log("payload1", payload); dispatch({ type: LIST_PAGE_LOADED, payload })},
  onUnload: () => dispatch({ type: LIST_PAGE_UNLOADED })
});

class Listpage extends React.Component {
  componentWillMount() {
	  console.log("lo", this.props.match.params.id);
    this.props.onLoad(agent.Articles.byGenre(this.props.match.params.id));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }
  render(){
	  
	  if(this.props.articles){
	  return(
	 <div>
	 <div className="genre-banner">
	  <Grid>
		<Col md={8} mdOffset={1}>
		 {this.props.articles[0].genre}
		</Col>
	 </Grid>
	 </div>
	 <Grid>
		<Col md={6} mdOffset={2}>
	  { this.props.articles.map(article => <div><ListComponent article={article} key={article.slug}/></div>)}
		</Col>
	  </Grid>
	  </div>
	  )
	  
	  }
	  else return(<span>loading</span>)
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listpage);
export { Listpage, mapStateToProps };
