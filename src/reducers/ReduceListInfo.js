const initialState = [];
export default function AllFunction(state = initialState, action) {
  if (action.type === "ADD_WEATHER") {
    var isDuplicate = state.filter(function(item) {
      return item.id !== action.list.id;
    });
    isDuplicate.splice(action.index, 0, action.list);
    
    return isDuplicate;
    // return[...element,action.list];
  } else if (action.type === "FETCH_API") {
    return action.list[0];
  } else if (action.type === "UPDATE_ITEMS") {
    let element = state.map(element => {
      if (element.id === action.id) {
        element.main = action.list.main;
        element.weather = action.list.weather;
      }
      return element;
    });

    return element;
  } else if (action.type === "ADD_INFO") {
    let element = state.map(element => {
      
      return element;
    });

    return element;
  }else if(action.type==="REMOVE_ITEMS"){
    
  
      let newArray = state.slice()
      newArray.splice(action.index, 1)
      return newArray
    
    
  }

  return state;
}
