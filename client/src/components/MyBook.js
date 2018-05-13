import React, {Component} from "react";
import {  Link} from "react-router-dom";
import {Grid, Col, Row, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  SET_CHAPTER
} from '../constants/actionTypes';

const mapStateToProps = state => ({
	
  ...state.book,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onSetChapter: (chapter) =>{
    dispatch({ type: SET_CHAPTER, chapter })}
});


const ChapterComponent=props =>{
	console.log("inChapterComponent", props.chapter.title);
	return(
		<Link to="/write/editChapter" onClick={()=>props.SetChapter(props.chapter)}><div>{props.chapter.title} </div></Link>
	)
	
	}

class MyBook extends React.Component{
	constructor(){
		super()
		
		
		this.SetChapter=chapter=>{
		this.props.onSetChapter(chapter)
		}
		}
	
	
	render(){
	const chapters=this.props.currentBook?this.props.currentBook.chapters.map(chapter=><ChapterComponent chapter={chapter} key={chapter.id} SetChapter={this.SetChapter}/>):"Loading"
	return(<Grid>
				<Row>
					<Col mdOffset={2}>
						<h3>Book 3</h3>
					</Col>
				</Row>
				<Row>
					<Col mdOffset={2} md={2}>
						 <img class="img-fluid" src="http://via.placeholder.com/150x225" alt=""/>
					</Col>
					<Col >
						
						<span><h4>Table of Contents</h4>
						<Link to="/write/newChapter"><Button bsStyle="warning">+New Chapter</Button></Link></span>
						{chapters}
					</Col>
				</Row>
			</Grid>)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(MyBook);
