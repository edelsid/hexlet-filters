import { GET_POSTS_SUCCESS, FILTER_POSTS_SUCCESS, SORT_POSTS_SUCCESS, filterPosts } from "./actions";

const initialState = {
  posts: [],
  reorganizedPosts: [],
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
        reorganizedPosts: action.posts,
      }
    }
    default:
      return state;
  }
};

export default postReducer;