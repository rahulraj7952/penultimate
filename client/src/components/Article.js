import React from 'react';
import agent from '../agent';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {Grid, Row, Col} from 'react-bootstrap';
import { ARTICLE_PAGE_LOADED, ARTICLE_PAGE_UNLOADED } from '../constants/actionTypes';
import ArticleActions from './ArticleActions';
import './Article.css';
import {
  FacebookShareCount,  GooglePlusShareCount,  LinkedinShareCount,
  FacebookShareButton,  GooglePlusShareButton,  LinkedinShareButton,  TwitterShareButton,
  FacebookIcon,  TwitterIcon,  GooglePlusIcon , LinkedinIcon} from 'react-share';

const mapStateToProps = state => ({
  ...state.article,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: ARTICLE_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: ARTICLE_PAGE_UNLOADED })
});

class Article extends React.Component {
  componentWillMount() {
	
    this.props.onLoad(agent.Articles.get(this.props.match.params.id));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
	  
	   const shareUrl = 'http://www.writing-world.com/publish/tensteps.shtml';
const title = 'GitHub';	
	  
	   //console.log("hahad", this.props.match.params.id)
    if (!this.props.article) {
      return null;	
    }
    console.log(this.props.article)

    //const markup = { __html: marked(this.props.article.body, { sanitize: true }) };
    const htmlString = this.props.article.contentState;
		const Content= () => (
  <div dangerouslySetInnerHTML={{ __html: htmlString }} />)
    const canModify = this.props.currentUser &&
      this.props.currentUser.username === this.props.article.author.username;
    return (
      <div className="article-page">
		<Grid>
        <div>
          <div>
			
			<div  className="article-banner">
				<h1><b>{this.props.article.title}</b></h1>
				<h5><b>{this.props.article.genre}</b></h5>
				<span> by<Link to={`/@${this.props.article.author.username}`} className="author">
				<h4>{this.props.article.author.username}</h4>
				</Link></span>
			</div>	
			
            <ArticleActions canModify={canModify} article={this.props.article}/>
            
             <div className="Demo__container">
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

          </div>
        </div>
		<br/>
		<br/>
			<Row>
				<Col md={6} mdOffset={2} className="article-body" >		
					<Content/>
				</Col>
				<Col md={3} className="right-recommend">
					<h5 > Recommended for you</h5>
				</Col>	
			</Row>
          </Grid>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
