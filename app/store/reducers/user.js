import * as constants from "Constants/demo"

const initialState = {

}

export default function update(state = initialState, action) {
  switch(action.type) {
    case constants.SOME_ONE:
      return {
        ...state,
      }
    default:
      return state;
  }
}