import { call, put, take, takeEvery } from "redux-saga/effects";
import { 
  GET_POSTS, 
  GET_POSTS_SUCCESS, 
  FILTER_POSTS, 
  FILTER_POSTS_SUCCESS, 
  SORT_POSTS, 
  SORT_POSTS_SUCCESS 
} from "./actions";

const filters = [];

function countWithRange(reviews, formRange) {
  let result = [];
  reviews.forEach(el => {
    if (el.rating >= formRange.min && el.rating <= formRange.max) 
      result.push(el);
  });
  return result;
}

function fetchPosts() {
  const rawUrl = import.meta.env.VITE_API_URL;
  return fetch(`${rawUrl}/posts`).then(res => res.json());
}

function filterPosts(filter, reviews, formRange) {
  let result = [];
  const found = filters.find(e => e === filter);

  if (found) {
    const index = filters.indexOf(found);
    filters.splice(index, 1);
    if (filters.length === 0) return countWithRange(reviews, formRange);
  } else if (!found && filter) {
    filters.push(filter);
  };

  if (filters.length === 0) {
    return countWithRange(reviews, formRange);
  }

  for (let i = 0; i <= filters.length; i++) {
    reviews.forEach(el => {
      if (el.platform === filters[i] && 
      (el.rating >= formRange.min && el.rating <= formRange.max)) 
        result.push(el);
    });
  }
  return result;
}

function* onFetchPosts() {
  const posts = yield call(fetchPosts);
  yield put ({ type: GET_POSTS_SUCCESS, posts });
}

function* onFilterPosts({ payload }) {
  const { filter, reviews, formRange } = payload;
  const posts = yield call(filterPosts, filter, reviews, formRange);
  yield put ({ type: FILTER_POSTS_SUCCESS, posts });
}

function* onSortPosts() {

}

function* saga() {
  yield takeEvery(GET_POSTS, onFetchPosts);
  yield takeEvery(FILTER_POSTS, onFilterPosts);
  yield takeEvery(SORT_POSTS, onSortPosts);
}

export default saga;