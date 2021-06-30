import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import swal from "sweetalert2";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Toast_1sec } from "../alerts/swal";
import { FaUserAlt } from "react-icons/fa";

import { login } from "../actions/auth";
import { render } from "@testing-library/react";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      setTimeout(() => {
        dispatch(login(username, password))
          .then(() => {
            Toast_1sec.fire({
              icon: "success",
              title: "Signed in successfully",
            });
            if (currentUser.isAdmin === 0) {
              props.history.push("/profile");
            } else {
              props.history.push("/admin-profile");
            }
            // window.location.reload();
          })
          .catch(() => {
            setLoading(false);
          });
      }, 1500);
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    if (currentUser.isAdmin === 0) {
      return <Redirect to="/profile" />;
    } else {
      return <Redirect to="/admin-profile" />;
    }
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username">Username</label>

            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              style={{
                marginRight: "0px",
                marginTop: "20px",
                height: "50px",
              }}
            >
              {/* {loading && (
                <span
                  style={{
                    marginRight: "15px",
                    marginTop: "5px",
                    paddingTop: "0px",
                    paddingBottom: "0px",
                  }}
                >
                  <CircularProgress size={20} color={"primary"} />
                </span>
              )} */}
              <span>Login</span>
            </Button>
            {loading && (
              <span>
                <LinearProgress />
              </span>
            )}
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
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

export default Login;
