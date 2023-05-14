import {legacy_createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import AuthReducer from './Auth/Auth.reducer';
import EventReducer from './Event/Event.reducer';
const rootReducer = combineReducers({
    auth:AuthReducer,
    event:EventReducer,
})

const store= legacy_createStore(rootReducer,applyMiddleware(thunk));

export default store