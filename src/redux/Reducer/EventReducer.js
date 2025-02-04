import { FETCH_EVENTS_REQUEST, FETCH_EVENTS_SUCCESS, FETCH_EVENTS_FAILURE } from "../Type";

const initialState = {
  events: [],
  isLoading: false,
  error: null,
};

const EventReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        events: action.payload,
        error: null,
      };
    case FETCH_EVENTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default EventReducer;
