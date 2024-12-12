import { call, put, takeEvery } from "redux-saga/effects";
import { GET_POSTS, GET_POSTS_SUCCESS } from "./actions";

function postFetch() {
  return fetch("").then(res => res.json());
}

function* fetchPosts() {
  const posts = yield call(postFetch);
  yield put ({ type: GET_POSTS_SUCCESS, posts });
}

function* saga() {
  yield takeEvery(GET_POSTS, fetchPosts);
}

export default saga;