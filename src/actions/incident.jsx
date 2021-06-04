import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  INCIDENT_DATA,
} from "./types";

import AuthService from "../services/auth.service";

import { getAllIncidents } from "../services/incident-service";

export const incident_data = (userid) => async (dispatch) => {
  try {
    const data = await getAllIncidents(userid);
    dispatch({
      type: INCIDENT_DATA,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }

  // return getAllIncidents(userid).then(
  //   (response) => {
  //     dispatch({
  //       type: INCIDENT_DATA,
  //       payload: response.data,
  //     });
  //   },
  //   (error) => {
  //     const message =
  //       (error.response &&
  //         error.response.data &&
  //         error.response.data.message) ||
  //       error.message ||
  //       error.toString();

  //     // dispatch({
  //     //   type: LOGIN_FAIL,
  //     // });

  //     dispatch({
  //       type: SET_MESSAGE,
  //       payload: message,
  //     });

  //     return Promise.reject();
  //   }
  // );
};
