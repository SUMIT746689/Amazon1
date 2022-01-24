import { createStore } from "redux";
import { CombineReducers } from "../reducer/CombineReducers";

export const Store = createStore(CombineReducers)
