import {createStore, applyMiddleware} from 'redux';
import {apiMiddleware} from 'redux-api-middleware';
import rootReducer from '../reducers';

// const createStoreWithMiddleware = applyMiddleware()(createStore);

// function configureStore() {
//   return createStoreWithMiddleware(rootReducer);
// }

// const store = configureStore();

// const {dispatch} = store;

//STORE
const store = createStore(rootReducer);

export default store;
