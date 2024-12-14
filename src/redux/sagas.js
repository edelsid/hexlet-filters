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

function fetchPosts() {
  const rawUrl = import.meta.env.VITE_API_URL;
  return fetch(`${rawUrl}/posts`).then(res => res.json());
}

function filterPosts(filter, reviews) {
  let result = [];
  const found = filters.find(e => e === filter);

  if (found) {
    const index = filters.indexOf(found);
    filters.splice(index, 1);
    if (filters.length === 0) return reviews;
  } else {
    filters.push(filter);
  };

  for (let i = 0; i < filters.length; i++) {
    reviews.forEach(el => {
      if (el.platform === filters[i]) result.push(el);
    });
  }
  return result;
}

function* onFetchPosts() {
  const posts = yield call(fetchPosts);
  yield put ({ type: GET_POSTS_SUCCESS, posts });
}

function* onFilterPosts({ payload }) {
  const { filter, reviews } = payload;
  const posts = yield call(filterPosts, filter, reviews);
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