import { applyMiddleware, createStore } from "redux";
import rootReducer from "../Reducer/rootReducer";
import thunk from "redux-thunk";

const rootStore = createStore(rootReducer,applyMiddleware(thunk));
export const store = rootStore;