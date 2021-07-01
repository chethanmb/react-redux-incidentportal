import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import logo from "../logo_2.svg";
import Swal from "sweetalert2";
import moment from "moment";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import fileDownload from "js-file-download";
import { Link } from "react-router-dom";
import axios from "axios";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import MdInfoOutline from "@material-ui/icons/InfoOutlined";
import Divider from "@material-ui/core/Divider";
import "antd/dist/antd.css";
import { Tabs } from "antd";
import { getAllIncidents } from "../services/incident-service";
import VisibilityIcon from "@material-ui/icons/Visibility";

import { Modal } from "antd";

import { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { incident_data } from "../actions/incident";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};
const { TabPane } = Tabs;
const Profile = () => {
  const incidentData = useSelector((state) => state.incident);

  const { user: currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  //const [incidentData, setIncidentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const [loadModal, setloadModal] = useState(false);
  const [singleIncident, setSingleIncident] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(incident_data(currentUser.id));
      setloadModal(true);
      setLoading(false);
    }, 300);
  }, [dispatch, currentUser.id]);

  const showModal = (e, rowData) => {
    console.log(rowData);
    setIsModalVisible(true);
    setSingleIncident(rowData);
  };

  const handleOk = (e) => {
    setIsModalVisible(false);
  };

  const handleCancel = (e) => {
    setIsModalVisible(false);
  };

  const onClickDownload = (e) => {
    var attid = singleIncident.attachId;
    var attname = singleIncident.attachmentName;
    axios
      .get(
        `http://ec2-3-20-170-251.us-east-2.compute.amazonaws.com/api/api/Incidents/attachments/${attid}`,
        {
          responseType: "blob",
        }
      )
      .then((res) => {
        // fileDownload(res.data, attname);
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${attname}`);
        document.body.appendChild(link);
        link.click();
      });
  };

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  if (loading) {
    return (
      <div
        className="container"
        style={{
          marginTop: "15%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src={logo}
          className="App-logo"
          alt="logo"
          style={{
            height: "300px",
            width: "300px",
            display: "flex",
            justifyContent: "center",
          }}
        />
      </div>
    );
  }

  return (
    <div className="container">
      <Link to="/Create" style={{ textDecoration: "none" }}>
        <Button
          style={{
            marginTop: "10px",
            marginBottom: "20px",
            alignContent: "left",
          }}
          variant="contained"
          color="primary"
          type="submit"
          endIcon={<Icon>launch</Icon>}
        >
          <span>Submit New</span>{" "}
        </Button>
      </Link>

      {loadModal ? (
        <div className="mat-table">
          <MaterialTable
            icons={tableIcons}
            title="Incident History"
            style={{
              padding: "0 10px",
              backgroundColor: "",
              fontSize: 13,
              color: "",
            }}
            options={{
              pageSize: 8,
              //pageSizeOptions: [20, 50, 100],
              toolbar: true,
              paging: true,
              search: true,
              height: 100,
              cellStyle: { padding: "0.6em" },
              headerStyle: { padding: "0.8em" },
              actionsColumnIndex: -1,
            }}
            columns={[
              {
                title: "#",
                field: "id",
                width: 500,
                headerStyle: {
                  maxWidth: "2%",
                  backgroundColor: "#eeeeee",
                  whiteSpace: "nowrap",
                },
                render: (rowdata) => (
                  <div style={{ width: "", backgroundColor: "" }}>
                    {rowdata.tableData.id + 1}
                  </div>
                ),
              },
              {
                title: "Title",
                field: "title",
                width: 100,
                headerStyle: {
                  backgroundColor: "#eeeeee",
                  color: "#0",
                },
              },
              {
                title: "Description",
                field: "description",
                width: 500,
                headerStyle: {
                  backgroundColor: "#eeeeee",
                  color: "#0",
                },
              },
              {
                title: "Reported Date",
                field: "incidentReportedDate",
                headerStyle: {
                  backgroundColor: "#eeeeee",
                  color: "#0",
                },
              },
              {
                title: "Attachments",
                field: "attachmentName",
                headerStyle: {
                  backgroundColor: "#eeeeee",
                  color: "#0",
                },
              },
            ]}
            actions={[
              {
                icon: VisibilityOutlinedIcon,

                tooltip: "View",
                onClick: (event, rowData) => {
                  showModal(event, rowData);
                },
              },
            ]}
            data={incidentData}
          />
        </div>
      ) : (
        <></>
      )}

      <Modal
        title=""
        visible={isModalVisible}
        onOk={handleOk}
        okText="Close"
        okButtonProps={{ style: { backgroundColor: "#3f51b5" } }}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: "none" } }}
        width={800}
        // footer={
        //   <Button key="OK" onClick={this.handleOk}>
        //     OK
        //   </Button>
        // }
        //centered
      >
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <span>
                <MdInfoOutline />
                Info Set 1
              </span>
            }
            key="1"
          >
            <Form>
              <div>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <div className="form-group">
                      <label>Title</label>
                      <Input
                        name="title"
                        type="text"
                        className="form-control"
                        value={singleIncident.title}
                        disabled="true"
                      />
                    </div>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <div className="form-group">
                      <label>Description</label>
                      <Input
                        name="description"
                        type="text"
                        className="form-control"
                        value={singleIncident.description}
                        disabled="true"
                      />
                    </div>
                  </Grid>
                  <Divider />
                  <Grid item xs={12} sm={6}>
                    <div className="form-group">
                      <label>Reported Date</label>
                      <Input
                        name="title"
                        type="text"
                        className="form-control"
                        value={singleIncident.incidentReportedDate}
                        disabled="true"
                      />
                    </div>
                  </Grid>
                  {singleIncident.attachmentName ? (
                    <Grid item xs={12} sm={6}>
                      <div className="form-group">
                        <label>Attachments</label>
                        <Input
                          name="attachmentName"
                          type="text"
                          className="form-control"
                          value={singleIncident.attachmentName}
                          disabled="true"
                        />

                        <Link
                          //style={style}
                          size="small"
                          backgroundColor="green"
                          onClick={() => {
                            onClickDownload();
                          }}
                        >
                          <b>
                            <u> Download Attachments</u>
                          </b>
                          <ArrowDownwardIcon />
                        </Link>
                      </div>
                    </Grid>
                  ) : (
                    <> </>
                  )}
                </Grid>
              </div>
            </Form>
          </TabPane>
          <TabPane
            tab={
              <span>
                <MdInfoOutline />
                Info Set 2
              </span>
            }
            key="2"
          >
            Info Set 2
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  );
};

export default Profile;
