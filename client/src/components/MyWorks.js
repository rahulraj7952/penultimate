import React, {Component} from "react";
import {  Link} from "react-router-dom";
import {Grid, Col, Row, Button} from 'react-bootstrap';
import Book from './Dashboard/Book';
import {
  BOOKS_LOADED,
  BOOKS_UNLOADED,
} from '../constants/actionTypes';
import agent from '../agent';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
	
  ...state.book,
  ...state.common,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>{
    dispatch({ type: BOOKS_LOADED, payload })},
  onUnload: () =>
    dispatch({  type: BOOKS_UNLOADED })
});




class MyWorks extends React.Component{
	
	 componentWillMount() {
  this.props.onLoad(agent.Books.byAuthor(this.props.currentUser.username));
  }

	
	render(){
	const myBooks=this.props.books?this.props.books.books.map(book=><Book book={book} key={book.id}/>):"Loading"
	return(<Grid>
				<Row>
					<Col mdOffset={2}>
						<div><Link to="write"><Button bsStyle="success"className="action-button"> Create a new Work!</Button></Link></div>
						<br/>
						<div>or</div><br/>
						<div><h5><b>Complete your previous work</b></h5></div>
						<br/>
						{myBooks}
	
					</Col>
				</Row>
			</Grid>)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(MyWorks);
