import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Toast } from "../alerts/swal";

import { register } from "../actions/auth";

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

const Register = (props) => {
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

  const { message } = useSelector((state) => state.message);
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
    axios.get(`http://localhost/api/Users/locations/${Id}`).then((response) => {
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
            title: "Registration successful",
          });
          props.history.push("/login");
        })
        .then(() => {})
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        {/* <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        /> */}

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              {/* <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div> */}

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="empId">Emp ID</label>
                <Input
                  type="text"
                  className="form-control"
                  name="empId"
                  value={empId}
                  onChange={onChangeEmpId}
                  validations={[required, vempId]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="fname">First name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="fname"
                  value={fname}
                  onChange={onChangeFname}
                  validations={[required, vfname]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="fname">Last name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="lname"
                  value={lname}
                  onChange={onChangeLname}
                  validations={[required, vlname]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <Input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={phone}
                  onChange={onChangePhone}
                  // validations={[required, vphone]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="custEmail">Customer Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="custEmail"
                  value={custEmail}
                  onChange={onChangeCustEmail}
                  validations={[required, vcustEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="customerId">Customer</label>
                <select
                  className="form-control"
                  name="Customer"
                  value={customerId}
                  onChange={onChangeLocationId}
                >
                  <option>Select Client</option>
                  {customerData.map((e, key) => {
                    // debugger;
                    return (
                      <option key={key} value={e.customerId}>
                        {e.customerName}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="locationId">Location</label>
                <select
                  className="form-control"
                  name="locationId"
                  value={locationId}
                  onChange={onChangeLoadLocations}
                >
                  {locationData.map((e, key) => {
                    return (
                      <option key={key} value={e.locationId}>
                        {e.locationName}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;
