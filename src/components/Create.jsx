import React, { useState, useEffect, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { saveNewIncident } from "../services/incident-service";
import { FaArrowAltCircleRight } from "react-icons/fa";
import swal from "sweetalert2";
import axios from "axios";
import authService from "../services/auth.service";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import SaveIcon from "@material-ui/icons/Save";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Progress } from "antd";
import { Modal } from "antd";
import "antd/dist/antd.css";
import { Tabs } from "antd";
import MdInfoOutline from "@material-ui/icons/InfoOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Tooltip } from "antd";
import Container from "@material-ui/core/Container";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

const Create = (props) => {
  const classes = useStyles();
  const form = useRef();
  const checkBtn = useRef();

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [appid, setAppid] = useState("");
  const [attachid, setAttachid] = useState("");
  const [date, setDate] = useState("");
  const [appdata, setAppdata] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const [selectStatus, setSelectStatus] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // debugger;
    async function getApps() {
      await axios
        .get("http://localhost/api/Incidents/get-app-list")
        .then((response) => {
          setAppdata(
            response.data

            // response.data.map(({ applicationId, applicationName }) => ({
            //   id: applicationId,
            //   name: applicationName,
            // }))
          );
          setLoading(false);
        });
    }
    getApps();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    setSuccessful(false);
    setLoading(true);
    setMessage("");

    // form.validateAll();
    const formData = new FormData(event.target);
    formData.append("attachments", selectedFile);
    formData.append("userid", authService.getCurrentUser().id);

    if (checkBtn.current.context._errors.length === 0) {
      saveNewIncident(formData).then(
        (response) => {
          setMessage(response.data);
          setSuccessful(true);

          props.history.push("/profile");
          //window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  // onChangeUserid(e) {
  //   setState({
  //     userid: e.target.value,
  //   });
  // }
  const onChangeapplicationId = (e) => {
    console.log(e.target.value);
    setAppid(e.target.value);
  };
  const onChangeAttachid = (e) => {
    setAttachid(e.target.value);
  };
  const onChangeDate = (e) => {
    setDate(e.target.value);
  };
  const onChangefilehandler = (e) => {
    if (e.target.files[0].size > 5242880) {
      //window.alert("Please upload file smaller than 5 MB");
      document.getElementById("myFile").value = "";
      return swal.fire({
        icon: "warning",
        title: "File Size Alert",
        text: "Please upload file smaller than 5 MB",
        width: "22rem",
        toast: false,
        //backdrop: `rgba(152, 93, 91, 0.6)`,
      });
    } else {
      setSelectedFile(e.target.files[0]);
      setFileSize(Math.round(e.target.files[0].size / 1024));
      setSelectStatus(true);
      setLoading(0);
    }
  };

  const checkFileSize = (event) => {
    let files = event.target.files;
    let size = 5124;
    let err = "";
    for (var x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err += files[x].type + "is too large, please pick a smaller file\n";
      }
    }
    if (err !== "") {
      event.target.value = null;
      console.log(err);
      return false;
    }

    return true;
  };

  return (
    <div className="container">
      <Form onSubmit={handleSubmit} ref={form}>
        <div className="col-sm-6 mx-auto ">
          <Paper elevation={2}>
            <div className="col-sm-8 mx-auto ">
              <div class="center">
                <label style={{ fontSize: "20px", marginTop: "20px" }}>
                  Incident Details
                </label>
                <div className="form-group">
                  <Input
                    name="title"
                    type="text"
                    placeholder="Title"
                    className="form-control"
                    value={title}
                    onChange={onChangeTitle}
                    validations={[required]}
                  />
                </div>
                <div className="form-group">
                  <Input
                    name="description"
                    type="text"
                    placeholder="Description"
                    className="form-control"
                    value={description}
                    onChange={onChangeDescription}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <select
                    disabled={loading}
                    className="form-control"
                    name="appid"
                    placeholder="Application"
                    value={appid}
                    onChange={onChangeapplicationId}
                  >
                    <option>Select an App</option>
                    {appdata.map((e, key) => {
                      // debugger;
                      return (
                        <option key={key} value={e.applicationId}>
                          {e.applicationName}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="form-group">
                  <Input
                    name="Placeholder 1"
                    type="text"
                    placeholder="Placeholder 1"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group">
                <Tooltip title="To upload multiple files, please compress/zip the files into single file">
                  <Input
                    name="file"
                    type="file"
                    id="myFile"
                    placeholder="attachments"
                    className="form-control"
                    //value={date}
                    onChange={onChangefilehandler}
                    // validations={[required]}
                  />
                </Tooltip>
                {selectStatus ? <span>File size: {fileSize} KB</span> : <></>}
              </div>
              <div className="form-group">
                <Input
                  name="Placeholder 2"
                  type="text"
                  placeholder="Placeholder 2"
                  className="form-control"
                />
              </div>

              <div class="center">
                <div className="form-group ">
                  <Button
                    style={{
                      marginTop: "20px",
                      marginBottom: "30px",

                      alignContent: "center",
                    }}
                    fullWidth="true"
                    variant="contained"
                    color="primary"
                    type="submit"
                    endIcon={<Icon>send</Icon>}
                    disabled={loading}
                  >
                    <span>Submit</span>{" "}
                  </Button>
                  {loading && (
                    <span>
                      {/* <CircularProgress size={25} color={"primary"} /> */}
                      <LinearProgress />
                    </span>
                  )}
                </div>
              </div>

              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful
                        ? swal.fire({
                            icon: "success",
                            title: "Successfully submitted",
                            text: "_________________________________________",
                            width: "22rem",
                            toast: false,
                            backdrop: `rgba(93, 152, 91, 0.6)`,
                          })
                        : swal.fire({
                            icon: "error",
                            title: "An error occurred",
                            text: message,
                            width: "22rem",
                            toast: false,
                            backdrop: `rgba(152, 93, 91, 0.6)`,
                          })
                    }
                    role="alert"
                  >
                    {/* {message} */}
                  </div>
                </div>
              )}
              <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </div>
          </Paper>
        </div>
      </Form>
    </div>
  );
};

export default Create;

{
  /* <button
                className="btn btn-primary btn-block"
                disabled={loading}
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>
                  <b>Submit</b>
                </span>{" "}
              </button> */
}
