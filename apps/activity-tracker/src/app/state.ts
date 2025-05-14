import { Action, State } from "./models";

const searchResults = (state:State,keyword:string) => {
  if (keyword.length > 0) {
    const regex = new RegExp(keyword, 'i');
    return {...state,activities:[...state.activities].filter((activity) => regex.test(activity))};
  }else {
    return {...state, activities:[...state.initialState]}
  }
}

export const initialState:State = {activities:[],initialState:[]};

export const reducer = (state:State,action:Action) => {
  switch (action.type) {
    case "add":
      return {...state,activities:[...state.activities,action.payload],initialState:[...state.activities,action.payload]}
    case "search":
      return searchResults(state,action.payload)
    default:
      return state;
  }
}
