import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "../Type";

const initialState = {
  favoriteEvents: [],
};

const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favoriteEvents: [...state.favoriteEvents, action.payload],
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favoriteEvents: state.favoriteEvents.filter(
          (event) => event.event_date_id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default favoriteReducer;
