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
			    <img className="img-fluid" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK-qtteyP3xOU0Fcgpquy8DZnPEK92I59jY2iKB82_aNKforfx" alt=""/>	
			    </div>
			    <div className="col-12 col-lg-6 mt-80">
					<div className="plain-div">
						<h1 className="mb-15">{this.props.book.title}</h1>
							<h4>{this.props.book.genre}</h4>
							<span> by<Link to={`/@${this.props.book.author.username}`} className="mb-30">
										<h4>{this.props.book.author.username}</h4>
									</Link>
							</span>
					</div>
					<div className="plain-div mt-30">
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
