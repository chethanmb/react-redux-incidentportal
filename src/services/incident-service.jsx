import axios from "axios";
import moment from "moment";
import authHeader from "./auth-header";

const API_URL = "http://localhost/api/Incidents/";
const API_URL_2 = "http://localhost/api/Incidents/user/";

export const saveNewIncident = (fData) => {
  return axios
    .post(API_URL + "create", fData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response.data;
    });
};

export const getAllIncidents = (userid) => {
  return axios
    .get(API_URL_2 + userid, { headers: authHeader() })
    .then((response) => {
      let newRespData = response.data.map((x) => {
        var date = new Date(x.incidentReportedDate);
        var formattedDate = moment(date).format("DD-MM-YYYY HH:mm:ss");
        x.incidentReportedDate = formattedDate;
        return x;
      });
      return newRespData;
    });
};

export const downloadAttachments = (userid) => {
  return axios.get(API_URL_2 + userid).then((response) => {
    return response.data;
  });
};
