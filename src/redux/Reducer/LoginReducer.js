
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../Type";


const initialState = {
  isLoading: false,
  token: null,
  user: null,
  error: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
