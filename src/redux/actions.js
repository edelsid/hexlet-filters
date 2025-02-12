export const GET_POSTS = "GET_POSTS";
export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";

export const FILTER_POSTS = "FILTER_POSTS";
export const FILTER_POSTS_SUCCESS = "FILTER_POSTS_SUCCESS"

export const SORT_POSTS = "SORT_POSTS";
export const SORT_POSTS_SUCCESS = "SORT_POSTS_SUCCESS"

export const getPosts = () => ({
  type: GET_POSTS,
});

export const filterPosts = (data, filter, formRange) => ({
  type: FILTER_POSTS,
  payload: data,
  filter,
  formRange,
});

export const sortPosts = (data, sorting) => ({
  type: SORT_POSTS,
  payload: data,
  sorting,
});