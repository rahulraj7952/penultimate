import React, {Component} from 'react';
import DraftEditor from './DraftEditor';
import {Button, Grid, Row, Col} from 'react-bootstrap';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  ADD_TAG,
  EDITOR_PAGE_LOADED,
  REMOVE_TAG,
  ARTICLE_SUBMITTED,
  EDITOR_PAGE_UNLOADED,
  UPDATE_FIELD_EDITOR
} from '../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.editor,
  ...state.book
});

const mapDispatchToProps = dispatch => ({
  onAddTag: () =>
    dispatch({ type: ADD_TAG }),
  onLoad: payload =>
    dispatch({ type: EDITOR_PAGE_LOADED, payload }),
  onRemoveTag: tag =>
    dispatch({ type: REMOVE_TAG, tag }),
  onSubmit: (payload,slug) =>
    dispatch({ type: ARTICLE_SUBMITTED, payload ,slug}),
  onUnload: payload =>
    dispatch({ type: EDITOR_PAGE_UNLOADED }),
  onUpdateField: (key, value) =>
    dispatch({ type: UPDATE_FIELD_EDITOR, key, value })
   
});

class EditorForChapter extends React.Component{
	 constructor() {
    super();

    const updateFieldEvent =
      key => ev => this.props.onUpdateField(key, ev.target.value);
    this.changeTitle = updateFieldEvent('title');
   
    this.watchForEnter = ev => {
      if (ev.keyCode === 13) {
        ev.preventDefault();
        this.props.onAddTag();
      }
    };
	 this.submitForm = ev => {
      ev.preventDefault();
      const article = {
	
       title:this.props.title, 
        contentState: this.props.html,
        content:this.props.text 
      };
      

console.log("final", this.props.articleSlug)

	
      const promise =  this.props.articleSlug?agent.Articles.update(article,this.props.id):agent.Articles.create(article, this.props.slug);
      this.props.onSubmit(promise);
    };
  

}
   
	
	
	
	render(){
		return(
		<span>
		<Grid>
			<Row>
				<Col>
					<span>
					
					<Button bsStyle="warning"   onClick={this.submitForm}> Publish</Button>
					<br/>
					<fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Article Title"
                      value={this.props.title}
                      onChange={this.changeTitle} />
                  </fieldset>

					
					</span>
				</Col>
			</Row>
			<br/>
			<Row>
				<Col>
					<DraftEditor/>
				</Col>
			</Row>
		</Grid>
			
		</span>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorForChapter);
