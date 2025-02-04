import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "../Type";

export const addToFavorites = (event) => ({
  type: ADD_TO_FAVORITES,
  payload: event,
});

export const removeFromFavorites = (eventId) => ({
  type: REMOVE_FROM_FAVORITES,
  payload: eventId,
});
