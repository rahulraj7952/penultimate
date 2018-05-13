import {
  EDITOR_PAGE_LOADED,
  EDITOR_PAGE_UNLOADED,
  ARTICLE_SUBMITTED,
  ASYNC_START,
  BOOK_SUBMITTED,
  ADD_TAG,
  REMOVE_TAG,
  UPDATE_FIELD_EDITOR,
  UPDATE_MAIN_EDITOR,
  SET_CHAPTER
} from '../constants/actionTypes';

const defaultState={
	text:"Write your content here",
	title:"Untitled"
	}

export default (state = defaultState, action) => {
  switch (action.type) {
    case EDITOR_PAGE_LOADED:
      return {
        ...state,
        articleSlug: action.payload ? action.payload.article.slug : '',
        title: action.payload ? action.payload.article.title : '',
        description: action.payload ? action.payload.article.description : '',
        body: action.payload ? action.payload.article.body : '',
        tagInput: '',
        tagList: action.payload ? action.payload.article.tagList : []
      };
    case EDITOR_PAGE_UNLOADED:
      return {...defaultState};
    case ARTICLE_SUBMITTED:
      return {
        ...defaultState,
        inProgress: null,
        errors: action.error ? action.payload.errors : null
      };
    case ASYNC_START:
      if (action.subtype === ARTICLE_SUBMITTED) {
        return { ...state, inProgress: true };
      }
      break;
    case BOOK_SUBMITTED:
      return {
        ...state,
        inProgress: null,
        errors: action.error ? action.payload.errors : null
      };
    case ASYNC_START:
      if (action.subtype === BOOK_SUBMITTED) {
        return { ...state, inProgress: true };
      }
      break;
    case ADD_TAG:
      return {
        ...state,
        tagList: state.tagList.concat([state.tagInput]),
        tagInput: ''
      };
    case REMOVE_TAG:
      return {
        ...state,
        tagList: state.tagList.filter(tag => tag !== action.tag)
      };
    case UPDATE_FIELD_EDITOR:
      return { ...state, [action.key]: action.value };
    case UPDATE_MAIN_EDITOR:
		return {
			...state,
			html:action.html,
			text:action.text
			};
	case SET_CHAPTER:
		return{
			id:action.chapter._id,
			articleSlug:action.chapter.slug,
			text:action.chapter?action.chapter.content:"Write your content here...",
			title: action.chapter?action.chapter.title:"..."
			}
    default:
      return state;
  }

  return state;
};
