import axios from 'axios';
import { FETCH_EVENTS_REQUEST, FETCH_EVENTS_SUCCESS, FETCH_EVENTS_FAILURE } from '../Type';

// Action Creator - Fetch Events
export const fetchEvents = () => async (dispatch) => {
  dispatch({ type: FETCH_EVENTS_REQUEST });

  try {
    const response = await axios.post('http://3.7.81.243/projects/plie-api/public/api/events-listing');

    console.log('Events Response:', response.data);

    if (response.data.success) {
      dispatch({
        type: FETCH_EVENTS_SUCCESS,
        payload: response.data.data.events,
      });
    } else {
      dispatch({
        type: FETCH_EVENTS_FAILURE,
        payload: response.data.message,
      });
    }
  } catch (error) {
    console.error('Fetch Events Failed:', error);
    dispatch({
      type: FETCH_EVENTS_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
