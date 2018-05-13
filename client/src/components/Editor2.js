	import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  ADD_TAG,
  EDITOR_PAGE_LOADED,
  REMOVE_TAG,
  BOOK_SUBMITTED,
  EDITOR_PAGE_UNLOADED,
  UPDATE_FIELD_EDITOR
} from '../constants/actionTypes';
import {Link} from 'react-router-dom';
import DraftEditor from './DraftEditor';
import slugify from 'slug';

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
  onSubmit: (payload, slug)=>
    dispatch({ type: BOOK_SUBMITTED, payload, slug}),
  onUnload: payload =>
    dispatch({ type: EDITOR_PAGE_UNLOADED, payload }),
  onUpdateField: (key, value) =>
    dispatch({ type: UPDATE_FIELD_EDITOR, key, value })
   
});

class Editor extends React.Component {
  constructor() {
		super()

    const updateFieldEvent =
      key => ev => this.props.onUpdateField(key, ev.target.value);
    this.changeBookTitle = updateFieldEvent('bookTitle');
    this.changeDescription = updateFieldEvent('description');
    this.changeBody = updateFieldEvent('body');
    this.changeTagInput = updateFieldEvent('tagInput');
    this.changeGenre = updateFieldEvent('genre');

    this.watchForEnter = ev => {
      if (ev.keyCode === 13) {
        ev.preventDefault();
        this.props.onAddTag();
      }
    };

    this.removeTagHandler = tag => () => {
      this.props.onRemoveTag(tag);
    };
    
    

    this.submitForm = ev => {
      ev.preventDefault();
      var slug=slugify(this.props.bookTitle)+ '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
      const book= {
		slug:slug,
       title:this.props.bookTitle, 
        description: this.props.description, 
        genre:this.props.genre,
        imageurl: "http://via.placeholder.com/300x200"
      };
      /*const slug = { slug: this.props.bookSlug };
       const promise = this.props.bookSlug ?
        agent.Books.update(Object.assign(book, slug)) :
        agent.Books.create(book);*/
      const promise =agent.Books.create(book);
       //await console.log("promise", promise);
      this.props.onSubmit(promise, slug);
      
      
      
    };
  }

 
 
  render() {
    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">

            

              <form>
                <fieldset>

                  <fieldset className="form-group">
						<input
                      className="form-control"
                      type="text"
                      placeholder="Article Title"
                      value={this.props.bookTitle}
                      onChange={this.changeBookTitle} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="What's this article about?"
                      value={this.props.description}
                      onChange={this.changeDescription} />
                  </fieldset>
                  
                  <select class="form-control"  placeholder="select genre" onChange={this.changeGenre}>
                  <option value="" selected disabled>Choose genre</option>
					<option value ="adventure">Adventure</option>
					<option value="comedy">Comedy</option>
					<option value="drama">Drama</option>
					<option value="fantasy">Fantasy</option>
					<option value="horror">Horror</option>
					<option value="mystery">Mystery/Thriller</option>
					<option value="mythology">Mythology</option>
					<option value="plays">Play</option>
					<option value="poetry">Poetry</option>
					<option value="romance">Romance</option>
					<option value="satire">Satire</option>
					<option value="screenplay">Screenplay</option>
					<option value="tragedy">Tragedy</option>
				</select>

				<br/>
                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter tags"
                      value={this.props.tagInput}
                      onChange={this.changeTagInput}
                      onKeyUp={this.watchForEnter} 
                      
                      />

                    <div className="tag-list">
                      {
                        (this.props.tagList || []).map(tag => {
                          return (
                            <span className="tag-default tag-pill" key={tag}>
                              <i  className="ion-close-round"
                                  onClick={this.removeTagHandler(tag)}>
                              </i>
                              {tag}
                            </span>
                          );
                        })
                      }
                    </div>
                  </fieldset>

                  <button
                    className="btn pull-xs-right btn-primary"
                    type="button"
                    disabled={this.props.inProgress}
                    onClick={this.submitForm}>
                    Next
                  </button>
				
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
