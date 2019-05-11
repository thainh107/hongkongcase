import _ from "lodash";
import actionType from "../constants";
import Immutable from "seamless-immutable";
let initialState = Immutable({
  sections: [],
  dataOrder: []
});
export default (state = initialState, action) => {
  let newState = _.merge({}, state);
  switch (action.type) {
    case actionType.LOAD_SECTIONS_SUCCESS:
      newState = Immutable.setIn(state, ["sections"], action.payload);
      return newState;
    case actionType.LOAD_ORDERS_SUCCESS:
      newState = Immutable.setIn(state, ["dataOrder"], action.payload);
      return newState;
    default:
      return state;
  }
};

export const getSectionById = (state, sectionId) => {
  return state.sections[sectionId] || {};
};
