const initialState = [];
export default function AllFunction(state = initialState, action) {
  if(action.type==="FETCH_ONE_LIST"){
    return action.list
    }
  return state;
}
