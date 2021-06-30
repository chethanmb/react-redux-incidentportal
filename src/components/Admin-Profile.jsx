import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import authHeader from "../services/auth-header";

import axios from "axios";
import { Toast } from "../alerts/swal";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Card as matCard } from "@material-ui/core/Card";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import ListItemText from "@material-ui/core/ListItemText";
import { Link as muiLink } from "@material-ui/core/Link";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const AdminProfile = () => {
  const classes = useStyles();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://ec2-3-20-170-251.us-east-2.compute.amazonaws.com/api/Users/",
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        let modUser = response.data.map((x) => {
          if (x.isAdmin === 1) {
            x.isAdmin = "Admin";
          } else {
            x.isAdmin = "Normal User";
          }
          return x;
        });
        setUsers(modUser);
      });
  }, []);

  return (
    <div style={{ marginTop: "50px" }}>
      <h4
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        Admin Page: User List
      </h4>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Emp ID</TableCell>
                <TableCell align="left">Phone</TableCell>
                <TableCell align="left">Client Name</TableCell>
                <TableCell align="left">Client Email</TableCell>
                <TableCell align="left">Location</TableCell>
                <TableCell align="left">Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.username}
                  </TableCell>
                  <TableCell align="left">{row.fullName}</TableCell>
                  <TableCell align="left">{row.employeeId}</TableCell>
                  <TableCell align="left">{row.phone}</TableCell>
                  <TableCell align="left">{row.customerName}</TableCell>

                  <TableCell align="left">{row.customerEmail}</TableCell>
                  <TableCell align="left">{row.locationName}</TableCell>
                  <TableCell align="left">{row.isAdmin}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default AdminProfile;
