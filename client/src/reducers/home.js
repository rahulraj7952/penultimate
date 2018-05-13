import { HOME_PAGE_LOADED, HOME_PAGE_UNLOADED } from '../constants/actionTypes';

const defaultState = {
  homePageBooks:[]
}


export default (state = defaultState, action) => {
  switch (action.type) {
    case HOME_PAGE_LOADED:
      return {
        ...state,
        genre1:action.payload[1],
        homePageBooks:action.payload[0]
        
      };
    case HOME_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
