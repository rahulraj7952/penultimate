import React from 'react';
import { Link } from 'react-router-dom';
import agent from '../agent';
import { connect } from 'react-redux';
import {Carousel, Row, Col, Grid, Media} from 'react-bootstrap';
import {
  FOLLOW_USER,
  UNFOLLOW_USER,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
  LOAD_MORE
} from '../constants/actionTypes';
import ListComponent from "./ListComponent";
import "./Profile.css"

const EditProfileSettings = props => {
  if (props.isUser) {
    return (
      <Link
        to="/settings"
        className="btn btn-outline-secondary action-btn">
        <i className="ion-gear-a"></i> Edit Profile Settings
      </Link>
    );
  }
  return null;
};

const FollowUserButton = props => {
  if (props.isUser) {
    return null;
  }

  let classes = 'btn btn-sm action-btn';
  if (props.user.following) {
    classes += ' btn-primary';
  } else {
    classes += ' btn-outline-primary';
  }

  const handleClick = ev => {
-    ev.preventDefault();
    if (props.user.following) {
      props.unfollow(props.user.username)
    } else {
      props.follow(props.user.username)
    }
  };

  return (
    <button
      className={classes}
      onClick={handleClick}>
      <i className="ion-plus-round"></i>
      &nbsp;
      {props.user.following ? 'Unfollow' : 'Follow'} {props.user.username}
    </button>
  );
};

const mapStateToProps = state => ({
  ...state.bookList,
  currentUser: state.common.currentUser,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  onFollow: username => dispatch({
    type: FOLLOW_USER,
    payload: agent.Profile.follow(username)
  }),
  onLoad: payload => dispatch({ type: PROFILE_PAGE_LOADED, payload }),
  onUnfollow: username => dispatch({
    type: UNFOLLOW_USER,
    payload: agent.Profile.unfollow(username)
  }),
  onUnload: () => dispatch({ type: PROFILE_PAGE_UNLOADED }),
  onLoadMore:payload=>dispatch({type:LOAD_MORE, payload})
});

class Profile extends React.Component {
	
	  constructor(props, context) {
    super(props, context);

    this.loadMore = this.loadMore.bind(this);


    this.state = {
      value: '',
      counter: 1
      
    };
  }
	
  componentWillMount() {
	  console.log(this.props.match.params);
    this.props.onLoad(Promise.all([
      agent.Profile.get(this.props.match.params.username),
      agent.Books.byAuthor(this.props.match.params.username)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }
  
  loadMore(){
	  console.log("loadmore");	
	  this.setState({counter:this.state.counter+1})
	  console.log(this.state.counter);
	  this.props.onLoadMore(agent.Articles.byAuthor(this.props.match.params.username,this.state.counter))
	  }

  render() {
    const profile = this.props.profile;
    if (!profile) {
      return null;
    }

    const isUser = this.props.currentUser &&
      this.props.profile.username === this.props.currentUser.username;
if(this.props.books){
    return (
      <div className="profile-page">

        <div className="profile-banner">
		   <Grid>
				<Col mdOffset={5} >
                <img src={profile.image} className="user-img" alt={profile.username} />
                <h4>{profile.username}</h4>
                <p>12 stories so far</p>

                <EditProfileSettings isUser={isUser} />
                <FollowUserButton
                  isUser={isUser}
                  user={profile}
                  follow={this.props.onFollow}
                  unfollow={this.props.onUnfollow}
                  />

				</Col>
			</Grid>
     
           </div>
            <Grid>
				<Col md={8} mdOffset={1}>
					<div className="banner">
						<h4>Stories by {profile.username}</h4>
					</div>
				<Col md={9} mdOffset={1}>
					{ this.props.books.map(book => <div><ListComponent book={book} key={book.slug}/></div>)}
				</Col>
				
				</Col>
			</Grid>
				<button onClick={this.loadMore} className="load-more-btn mb-15">Show more</button>
      </div>
      
    )}
    
    else return(<div>nothing</div>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
export { Profile, mapStateToProps };
