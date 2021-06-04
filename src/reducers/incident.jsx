import { INCIDENT_DATA } from "../actions/types";

const incident = (state = [], action) => {
  switch (action.type) {
    case INCIDENT_DATA:
      return action.payload;

    default:
      return state;
  }
};

export default incident;
