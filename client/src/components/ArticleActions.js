import { Link } from 'react-router-dom';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import { DELETE_ARTICLE } from '../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload =>
    dispatch({ type: DELETE_ARTICLE, payload })
});

const ArticleActions = props => {
  const article = props.article;
  const del = () => {
    props.onClickDelete(agent.Articles.del(article.slug))
  };
  if (props.canModify) {
    return (
      <span>

        <button className="btn btn-default btn-sm"><Link
          to={`/editor/${article.slug}`}>
          <i className="ion-edit"></i> Edit Article
        </Link>
        </button>
		<span className ="delete-button">
        <button className="btn btn-danger btn-sm" onClick={del}>
          Delete Article
        </button>
		</span>
      </span>
    );
  }

  return (
    <span>
    </span>
  );
};

export default connect(() => ({}), mapDispatchToProps)(ArticleActions);
