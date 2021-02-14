import { applyMiddleware, combineReducers, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import foodReducer from './food/reducers';

const rootReducer = combineReducers({
  food: foodReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const enhancers = [reduxThunk];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  enhancers.push(createDebugger());
}

export const store = createStore(rootReducer, applyMiddleware(...enhancers));
