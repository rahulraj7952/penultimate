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
	const myBooks=this.props.books?this.props.books.books.map(book=><Book book={book} key={book.id}/>):"Checking for previous works..."
	return(<div className="main-content-wrapper">
			<div className="container">
				<div className="row justify-content-center">
					<div  className="col-12 col-lg-8 mb-15 mt-50 ">
						<div><Link to="write"><button className="btn btn-outline-primary mt-50"><h6> Create a new Work!</h6></button></Link></div>
						<br/>
						<div>or</div><br/>
						<div><h5>Complete your previous work</h5></div>
						<br/>
						{myBooks}
	
					</div>
				</div>
			</div>
			</div>)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(MyWorks);
