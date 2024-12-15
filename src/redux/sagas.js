import { call, put, takeEvery } from "redux-saga/effects";
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

function filterPosts(reviews, filter, formRange) {
  let result = [];
  const found = filters.find(e => e === filter);

  if (filter && found) {
    const index = filters.indexOf(found);
    filters.splice(index, 1);
    if (filters.length === 0) return countWithRange(reviews, formRange);
  } else if (filter && !found) {
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

function sortPosts(reviews, sorting) {
  let result = [];
  switch (sorting) {
    case "high": result = reviews.slice().sort((a, b) => b.rating - a.rating);
      break;
    case "low": result = reviews.slice().sort((a, b) => a.rating - b.rating);
      break;
    case "new": result = reviews.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case "old": result = reviews.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
  };
  return result;
}

function* onFetchPosts() {
  const posts = yield call(fetchPosts);
  yield put ({ type: GET_POSTS_SUCCESS, posts });
}

function* onFilterPosts({ payload }) {
  const { filter, reviews, formRange, sorting } = payload;
  const rawData = yield call(filterPosts, reviews, filter, formRange);
  const data = yield call(sortPosts, rawData, sorting);
  const filterArr = [...filters];
  yield put ({ type: FILTER_POSTS_SUCCESS, data, filterArr, formRange });
}

function* onSortPosts({ payload }) {
  const { reviews, formRange, sorting } = payload;
  const rawData = yield call(filterPosts, reviews, false, formRange);
  const data = yield call(sortPosts, rawData, sorting);
  yield put ({ type: SORT_POSTS_SUCCESS, data, sorting });
}

function* saga() {
  yield takeEvery(GET_POSTS, onFetchPosts);
  yield takeEvery(FILTER_POSTS, onFilterPosts);
  yield takeEvery(SORT_POSTS, onSortPosts);
}

export default saga;