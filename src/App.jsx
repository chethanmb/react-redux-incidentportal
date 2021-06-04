import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import logo from "./logo.svg";

import Login from "./components/Login";
import Register from "./components/Register";
// import Home from "./components/Home";
import Profile from "./components/Profile";
import Create from "./components/Create";
import Userdata from "./components/Userdata";
// import BoardUser from "./components/BoardUser";
// import BoardModerator from "./components/BoardModerator";
// import BoardAdmin from "./components/BoardAdmin";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { makeStyles } from "@material-ui/core/styles";
import { Link as muiLink } from "@material-ui/core/Link";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

const App = () => {
  const classes = useStyles();
  // const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  // const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  const logOut = () => {
    dispatch(logout());
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Router history={history}>
      <div>
        <nav className="navbar sticky-top navbar-expand navbar-dark">
          <Link to={"#"} className="navbar-brand">
            <img
              src={logo}
              className="App-logo"
              alt="logo"
              style={{ height: "50px", width: "50px" }}
            />
          </Link>
          {currentUser ? (
            <Link
              to={"/profile"}
              className="nav-link"
              style={{ color: "white", fontSize: "15px" }}
            >
              DATA
            </Link>
          ) : (
            <></>
          )}

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link
                  to={"/account"}
                  className="nav-link "
                  // style={{ color: "white", fontSize: "15px" }}
                >
                  ACCOUNT
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LOGOUT
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  LOGIN
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  REGISTER
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            {/* <Route exact path={["/", "/home"]} component={Home} /> */}
            {currentUser ? (
              <Route exact path="/" component={Profile} />
            ) : (
              <Route exact path="/" component={Login} />
            )}
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />

            <Route exact path="/profile" component={Profile} />
            <Route exact path="/create" component={Create} />
            <Route exact path="/account" component={Userdata} />
            {/* <Route exact path="/modal/:id" component={Create} /> */}
            {/* <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} /> */}
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
