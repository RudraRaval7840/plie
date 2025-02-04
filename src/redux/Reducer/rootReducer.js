
import { combineReducers } from 'redux';
import favoriteReducer from './FavoritesReducer';
import loginReducer from './LoginReducer';
import EventReducer from './EventReducer';

const rootReducer = combineReducers({
  favorites: favoriteReducer,
  login: loginReducer,
  events: EventReducer,
});

export default rootReducer;
