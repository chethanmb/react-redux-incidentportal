import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Toast } from "../alerts/swal";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Card as matCard } from "@material-ui/core/Card";
import { CardActions as matCardActions } from "@material-ui/core/CardActions";
import { CardContent as matCardContent } from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import ListItemText from "@material-ui/core/ListItemText";
import { Link as muiLink } from "@material-ui/core/Link";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { register } from "../actions/auth";
import { makeStyles } from "@material-ui/core/styles";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

// const validEmail = (value) => {
//   if (!isEmail(value)) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This is not a valid email.
//       </div>
//     );
//   }
// };

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const vempId = (value) => {
  if (value.length !== 8) {
    return (
      <div className="alert alert-danger" role="alert">
        Employee ID must be of 8 digits
      </div>
    );
  }
};
const vfname = (value) => {
  if (value.length < 1 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        <b>First Name</b> must be more than 1 character
      </div>
    );
  }
};
const vlname = (value) => {
  if (value.length < 1 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        <b>Last Name</b> must be more than 1 character
      </div>
    );
  }
};
const vcustEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email ID
      </div>
    );
  }
};

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Userdata = (props) => {
  const classes = useStyles();
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  //const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [empId, setEmpID] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [custEmail, setCustEmail] = useState("");
  const [locationId, setLocationId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [customerData, setCustomerData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [successful, setSuccessful] = useState(false);
  const [modifyUserdata, setModifyUserdata] = useState(false);

  const { message } = useSelector((state) => state.message);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("http://localhost/Users/get-cust-list").then((response) => {
      console.log(response.data);

      setCustomerData(response.data);
    });
  }, []);

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  // const onChangeEmail = (e) => {
  //   const email = e.target.value;
  //   setEmail(email);
  // };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const onChangeEmpId = (e) => {
    const empId = e.target.value;
    setEmpID(empId);
  };
  const onChangeFname = (e) => {
    const fname = e.target.value;
    setFname(fname);
  };
  const onChangeLname = (e) => {
    const lname = e.target.value;
    setLname(lname);
  };
  const onChangePhone = (e) => {
    const phone = e.target.value;
    setPhone(phone);
  };
  const onChangeCustEmail = (e) => {
    const custEmail = e.target.value;
    setCustEmail(custEmail);
  };
  const onChangeCustomerId = (e) => {
    const customerId = e.target.value;
    setCustomerId(customerId);
  };

  const onChangeLocationId = (e) => {
    //debugger;
    const customerId = e.target.value;
    setCustomerId(customerId);
    var Id = e.target.value;
    axios
      .get(`http://localhost/api//Users/locations/${Id}`)
      .then((response) => {
        console.log(response.data);
        setLocationData(response.data);
      });
  };

  const onChangeLoadLocations = (e) => {
    //debugger;
    setLocationId(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(
        register(
          username,
          password,
          empId,
          fname,
          lname,
          phone,
          custEmail,
          locationId,
          customerId
        )
      )
        .then(() => {
          setSuccessful(true);
          Toast.fire({
            icon: "success",
            title: "Signed in successfully",
          });
          props.history.push("/login");
        })
        .then(() => {})
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  const modifyBtnClick = (e) => {
    console.log("modify clicked");
    props.history.push("/change-profile");
  };

  return (
    <div className="container">
      <div
        style={{
          width: "99%",
          marginTop: "5%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Paper elevation={3}>
          <h4
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <u>My Profile</u>
          </h4>
          <Grid container spacing={10}>
            <Grid item xs={12} sm={6}>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Username/Email"
                    secondary={currentUser.username}
                  />
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary="Employee ID"
                    secondary={currentUser.employeeId}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="First Name"
                    secondary={currentUser.firstName}
                  />
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary="Last Name"
                    secondary={currentUser.lastName}
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={6} sm={3}>
              <List>
                <ListItem>
                  <ListItemText primary="Phone" secondary={currentUser.phone} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="ClientName"
                    secondary={currentUser.customerName}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="ClientEmail"
                    secondary={currentUser.customerEmail}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Location"
                    secondary={currentUser.locationName}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Paper>
      </div>
      <div
        style={{
          width: "99%",
          marginTop: "5%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          style={{
            alignContent: "center",
          }}
          variant="contained"
          color="primary"
          type="submit"
          onClick={modifyBtnClick}
        >
          Modify Data?
        </Button>
      </div>
    </div>
  );
};

export default Userdata;
