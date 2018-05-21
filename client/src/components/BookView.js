import React from 'react';
import agent from '../agent';
import { Link } from 'react-router-dom';
import Google from 'react-icons/lib/fa/google'
import { connect } from 'react-redux';
import {Grid, Row, Col} from 'react-bootstrap';
import { BOOK_PAGE_LOADED, BOOK_PAGE_UNLOADED, SET_BOOK_CHAPTER } from '../constants/actionTypes';
import ArticleActions from './ArticleActions';
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
		<li onClick={()=>props.SetChapter(props.chapter)} className="chapter-name mt-15">{props.chapter.title} </li>
	)
	
	}
	
const ChapterComponent=props =>{
	console.log("inChapterComponent", props.chapter.title);
	const htmlString = props.chapter.contentState;
		const Content= () => (
  <div dangerouslySetInnerHTML={{ __html: htmlString }} />)
	return(
	<div className="mt-30">	
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
  <div danger
  * ouslySetInnerHTML={{ __html: htmlString }} />)*/}
    const canModify = this.props.currentUser &&
      this.props.currentUser.username === this.props.book.author.username;
    return (
      <div className="main-content-wrappe">
        <div className="container " >
            <div className="row justify-content-center  ">
                <div className="col-12 col-lg-2 mt-80">
			    <img className="img-fluid" src="data:image/jpeg;base64,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" alt=""/>	
			    </div>
			    <div className="col-12 col-lg-6 mt-80">
			
						<h1 className="mb-15">{this.props.book.title}</h1>
							<h4>{this.props.book.genre}</h4>
							<span> by<Link to={`/@${this.props.book.author.username}`} className="mb-30">
										<h4>{this.props.book.author.username}</h4>
									</Link>
							</span>
					<div className=" mt-60">
						<ChapterComponent chapter={this.props.chapter}/>
					</div>

				</div>
				<div className="col-12 col-lg-4 mt-80 single_widget cat_widget">
					<h4>Table of Contents</h4>
					<ul>{this.props.book.chapters.map(chapter=><TableOfContents chapter={chapter} SetChapter={this.SetChapter}/>)}</ul>
				</div>
			</div>	
			
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
          
		</div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookView);
