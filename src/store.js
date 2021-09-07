import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { loadState, saveState } from './actions/stateActions';

const initialState = loadState();

const middleware = [thunk];

const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));

store.subscribe(() => {
  saveState(store.getState());
});

export default store;