import { GET_POSTS_SUCCESS, FILTER_POSTS_SUCCESS, SORT_POSTS_SUCCESS } from "./actions";

const initialState = {
  posts: [],
  reorganizedPosts: [],
  filters: [],
  formRange: {},
  sorting: "high",
}

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_SUCCESS:
      return { 
        ...state, 
        posts: action.posts 
      };
    case FILTER_POSTS_SUCCESS: {
      return { 
        ...state, 
        reorganizedPosts: action.data,
        filters: action.filterArr,
        formRange: action.formRange,
      }
    }
    case SORT_POSTS_SUCCESS: {
      return { 
        ...state, 
        reorganizedPosts: action.data,
        sorting: action.sorting,
      }
    }
    default:
      return state;
  }
};

export default postReducer;