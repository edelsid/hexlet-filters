import { configureStore } from "@reduxjs/toolkit";
import saga from "./sagas";
import postReducer from "./reducers";
import createSagaMiddleware from "redux-saga";
const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: {
    postReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(saga)