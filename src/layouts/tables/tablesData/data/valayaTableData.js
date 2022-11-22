/* eslint-disable */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useContext, useEffect, useState } from "react";
import { useMaterialUIController } from "context";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { authContext } from "context/TableState";
import PsychologyAltOutlinedIcon from '@mui/icons-material/PsychologyAltOutlined';

export default function valayadata() {
  const [controller] = useMaterialUIController();

  const { valayaTable, setValayaTable } = useContext(authContext);

  const [editOpen, setEditOpen] = React.useState(true);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => {
    setCurrentId("");
    setEditOpen(false);
  };
  const { token } = controller;
  const Author = ({ image, name, email }) => {
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
      <MDTypography variant="caption">{email}</MDTypography>
    </MDBox>;
  };

  const [loading, setLoading] = useState(false);
  const [valaya, setValaya] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [removeId, setRemoveId] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [deleteId, setDeleteId] = useState("alal");
  var dam = "";
  const openModal = (e) => {
    setDeleteId(e);
    dam = e;
    console.log(deleteId);
  };
  const getData = () => {
    setLoading(true);
    fetch("http://spyss.dollopinfotech.com/getValayaListApi?page=-1&size=10", {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((json) => {
        const temp = [];
        json.response.valayas.map((j) => {
          if (j.deleted !== true) {
            temp.push({
              Id: (
                <MDTypography
                  component="a"
                  href="#"
                  variant="caption"
                  color="text"
                  fontWeight="medium"
                >
                  {j.valayaId}
                </MDTypography>
              ),
              name: j.valayaName,

              actions: (
                <>
                  <MDTypography component="div" variant="caption" color="text" fontWeight="medium">
                    <div
                      style={{
                        fontSize: "2em",
                        borderRadius: "6px",
                        color: "orangered",
                        cursor: "pointer",
                      }}
                    >
                      <EditIcon
                        onClick={() => {
                          setCurrentId(j);
                          handleEditOpen();
                        }}
                      />
                    </div>
                  </MDTypography>
                  <MDTypography component="div" variant="caption" color="text" fontWeight="medium">
                    <div
                      style={{
                        fontSize: "2em",
                        color: "orangered",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      <DeleteIcon
                        onClick={() => openModal(j.uuid)}
                        data-bs-toggle="modal"
                        data-bs-target="#myModal"
                      ></DeleteIcon>

                      <div id="myModal" className="modal fade">
                        <div className="modal-dialog modal-confirm">
                          <div className="modal-content">
                            <div className="modal-header flex-column">
                              <div className="icon-b">
                                
                                <PsychologyAltOutlinedIcon 
                               fontSize="large" 
                               color="primary"
                                />

                                  {/* // className="material-icons"
                                  // type="button"
                                  // data-bs-dismiss="modal"
                                  // aria-label="Close" */}
                                  
                              
                              </div>
                              <h4 className="modal-title w-100">Are you sure?</h4>
                            </div>
                            <div className="modal-body">
                              <span>
                                Do you really want to delete these records? This process cannot be
                                undone.
                              </span>
                            </div>
                            <div className="modal-footer justify-content-center">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                onClick={deleteRemove}
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </MDTypography>
                </>
              ),
            });
          }
          return "";
        });
        setValaya(temp);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const deleteRemove = () => {
    setRemoveId(dam);
  };
  const remove = (id) => {
    handleClickOpen();
    console.log("id+>", id);
    fetch(`http://spyss.dollopinfotech.com/deleteValayaApi/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          getData();
        }
        throw response;
      })

      .catch((err) => err);
  };

  useEffect(() => {
    remove;
  }, []);

  useEffect(() => {
    if (removeId) {
      remove(removeId);
    }
  }, [removeId]);

  // useEffect(() => {
  //   getData();
  // }, []);

  useEffect(() => {
    getData();
  }, [valayaTable]);
  return {
    columns: [
      { Header: "valaya Id", accessor: "Id", width: "20%", align: "left" },
      { Header: "valaya Name", accessor: "name", align: "center" },
      // { Header: "valaya District ", accessor: "District", align: "left" },
      // { Header: "valaya Description", accessor: "Description", align: "left" },
      { Header: "actions", accessor: "actions", align: "center" },
    ],
    rows: valaya,
    handleEditClose,
    handleEditOpen,
    editOpen,
    currentId,
    loading,
  };
}
