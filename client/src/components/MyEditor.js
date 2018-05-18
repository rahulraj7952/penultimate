import React, { Component } from 'react';
import { EditorState, Editor, convertToRaw, convertFromRaw } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import {Grid, Row, Col} from 'react-bootstrap';
import debounce from 'lodash/debounce';
import axios from "axios";
import agent from "../agent";
import { connect } from 'react-redux';
import {
  EDITOR_PAGE_LOADED,
  ARTICLE_SUBMITTED,
  EDITOR_PAGE_UNLOADED,
  UPDATE_FIELD_EDITOR
} from '../constants/actionTypes';


const mapStateToProps = state => ({
	...state.editor,
  currentUser: state.common.currentUser
});


const mapDispatchToProps = dispatch => ({

  onLoad: payload =>
    dispatch({ type: EDITOR_PAGE_LOADED, payload }),
  onSubmit: payload =>
    dispatch({ type: ARTICLE_SUBMITTED, payload }),
  onUnload: payload =>
    dispatch({ type: EDITOR_PAGE_UNLOADED }),
  onUpdateField: (key, value) =>
    dispatch({ type: UPDATE_FIELD_EDITOR, key, value })
});

class MyEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty() };
    
    this.handleDraftSubmit=this.handleDraftSubmit.bind(this);
  }

  saveContent = debounce((content) => {
  	console.log(content)
    fetch('/content', {
      method: 'POST',
      body: JSON.stringify({
        content: convertToRaw(content),
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
  }, 1000);

  onChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    this.saveContent(contentState);
    this.setState({
      editorState,
    });
  }

  componentDidMount() {
    fetch('/content').then(val => val.json())
    .then(rawContent => {
    	console.log(rawContent)
      if (rawContent) {
        this.setState({ editorState: EditorState.createWithContent(convertFromRaw(rawContent)) })
      } else {
        this.setState({ editorState: EditorState.createEmpty() });
      }
    });
  }

	handleDraftSubmit(){
			//const contentState = this.state.editorState;
			var html = stateToHTML(this.state.editorState.getCurrentContent());
			
			var text = this.state.editorState.getCurrentContent().getPlainText();
			console.log(html);
			
			agent.Articles.create({title:"", 
        contentState:html, 
        content:text, 
        genre:"Mystery", 
        //author:this.props.currentUser.username, 
        imageurl: "http://via.placeholder.com/300x200"});
 
	}

  render() {
    	
    return (
    	<div className="editor-container">
    	<Col  mdOffset={1}>
    	<h4>Hi, {this.props.currentUser.username} Write your story here...</h4>
    	<br/>
    	  

      <div className = "Editor">
      	
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}/>
       
      </div>
      <button type="button" className="btn btn-default" onClick={this.handleDraftSubmit}>Submit</button>
       </Col>
      </div>
    );
  }
}

export default connect(mapStateToProps)(MyEditor);
