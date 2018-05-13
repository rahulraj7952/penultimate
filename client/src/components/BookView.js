import React from 'react';
import agent from '../agent';
import { Link } from 'react-router-dom';
import Google from 'react-icons/lib/fa/google'
import { connect } from 'react-redux';
import {Grid, Row, Col} from 'react-bootstrap';
import { BOOK_PAGE_LOADED, BOOK_PAGE_UNLOADED, SET_BOOK_CHAPTER } from '../constants/actionTypes';
import ArticleActions from './ArticleActions';
import './Article.css';
import {
  FacebookShareCount,  GooglePlusShareCount,  LinkedinShareCount,
  FacebookShareButton,  GooglePlusShareButton,  LinkedinShareButton,  TwitterShareButton,
  FacebookIcon,  TwitterIcon,  GooglePlusIcon , LinkedinIcon} from 'react-share';

const mapStateToProps = state => ({
  ...state.book,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: BOOK_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: BOOK_PAGE_UNLOADED }),
  onSetChapter: (chapter) =>{
    dispatch({ type: SET_BOOK_CHAPTER, chapter })}
});

const TableOfContents=props =>{
	console.log("Table of contents", props.chapter.title);
	return(
		<a onClick={()=>props.SetChapter(props.chapter)}><div>{props.chapter.title} </div></a>
	)
	
	}
	
const ChapterComponent=props =>{
	console.log("inChapterComponent", props.chapter.title);
	const htmlString = props.chapter.contentState;
		const Content= () => (
  <div dangerouslySetInnerHTML={{ __html: htmlString }} />)
	return(
	<div>	
	<h4>{props.chapter.title}</h4>
	<div><Content/></div>
	</div>
		
	)
	
	}	
	

class BookView extends React.Component {
	constructor(){
		super()
		
		
		this.SetChapter=chapter=>{
		this.props.onSetChapter(chapter)
		}
		}
	
  componentWillMount() {
	
    this.props.onLoad(agent.Books.get(this.props.match.params.id));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
	  
	   const shareUrl = 'http://www.writing-world.com/publish/tensteps.shtml';
const title = 'GitHub';	
	  
	   //console.log("hahad", this.props.match.params.id)
    if (!this.props.book) {
      return null;	
    }
    console.log(this.props.book)

    //const markup = { __html: marked(this.props.article.body, { sanitize: true }) };
   {/* const htmlString = this.props.article.contentState;
		const Content= () => (
  <div dangerouslySetInnerHTML={{ __html: htmlString }} />)*/}
    const canModify = this.props.currentUser &&
      this.props.currentUser.username === this.props.book.author.username;
    return (
      <div className="book-page">
		<Grid>
			
			<Row>
				<Col md={2}>
			    <img class="img-fluid" src="http://via.placeholder.com/120x180" alt=""/>	
			    </Col>
			    <Col md={6}>
				<h1><b>{this.props.book.title}</b></h1>
				<h5><b>{this.props.book.genre}</b></h5>
				<span> by<Link to={`/@${this.props.book.author.username}`} className="author">
				<h4>{this.props.book.author.username}</h4>
				</Link></span>
				</Col>
				<Col md={4}>
					<h4>Table of Contents</h4>
					{this.props.book.chapters.map(chapter=><TableOfContents chapter={chapter} SetChapter={this.SetChapter}/>)}
				</Col>
			</Row>	
			
           {/* <ArticleActions canModify={canModify} article={this.props.book}/>*/}
            
        {/*     <div className="Demo__container">
             <div className="Demo__some-network">
          <FacebookShareButton
            url={shareUrl}
            quote={title}
            className="Demo__some-network__share-button">
            <FacebookIcon
              size={32}
              round />
          </FacebookShareButton>

          <FacebookShareCount
            url={shareUrl}
            className="Demo__some-network__share-count">
            {count => count}
          </FacebookShareCount>
</div>
				
            
             <div className="Demo__some-network">
          <TwitterShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button">
            <TwitterIcon
              size={32}
              round />
          </TwitterShareButton>

          <div className="Demo__some-network__share-count">
            &nbsp;
          </div>
</div>
			 <div className="Demo__some-network">
          <GooglePlusShareButton
            url={shareUrl}
            className="Demo__some-network__share-button">
            <GooglePlusIcon
              size={32}
              round />
          </GooglePlusShareButton>

          <GooglePlusShareCount
            url={shareUrl}
            className="Demo__some-network__share-count">
            {count => count}
          </GooglePlusShareCount>
        </div>
        
           <div className="Demo__some-network">
          <LinkedinShareButton
            url={shareUrl}
            title={title}
            windowWidth={750}
            windowHeight={600}
            className="Demo__some-network__share-button">
            <LinkedinIcon
              size={32}
              round />
          </LinkedinShareButton>

          <LinkedinShareCount
            url={shareUrl}
            className="Demo__some-network__share-count">
            {count => count}
          </LinkedinShareCount>
</div>
</div>
*/}
          
		<br/>
		<br/>
			<Row>
				<Col md={6} mdOffset={2} className="article-body" >		
					<ChapterComponent chapter={this.props.chapter}/>
				</Col>
					
			</Row>
          </Grid>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookView);
