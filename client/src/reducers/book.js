import {
 BOOK_PAGE_LOADED,
 BOOK_PAGE_UNLOADED,
 BOOK_SUBMITTED,
 BOOKS_LOADED,
 BOOKS_UNLOADED,
 SET_CURRENT_BOOK,
 ARTICLE_SUBMITTED,
 SET_BOOK_CHAPTER
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
	  case BOOK_PAGE_LOADED:
		return{
			...state,
			book:action.payload,
			chapter:action.payload.chapters[0]
			}
	  case SET_BOOK_CHAPTER:
		return{
			...state,
			chapter:action.chapter
			}
	  case BOOK_PAGE_UNLOADED:
		return{
			}	
	  case BOOK_SUBMITTED:
		return{
			slug:action.slug
			}
		case BOOKS_LOADED:
			return{
				books: action.payload
				}
		case SET_CURRENT_BOOK:
			return{
				...state,
				currentBook:action.book,
				slug:action.book.slug}

    default:
      return state;
  }
};
