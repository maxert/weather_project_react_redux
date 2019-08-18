const initialState = [];
export default function AllFunction(state = initialState, action) {
  if(action.type==="CHANGE_ITEMS"){
    return action.value
    }
  return state;
}

    