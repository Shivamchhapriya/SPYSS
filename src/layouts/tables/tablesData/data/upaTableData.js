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
import React, { useEffect, useState } from "react";
import { useMaterialUIController } from "context";
import { useContext } from "react";
import { authContext } from "context/TableState";
import { Typography } from "@mui/material";


// Images

export default function Upadata() {
  const [controller] = useMaterialUIController();
  const {upaValayaTable,setUpaValayaTable} = useContext(authContext);


  const [editOpen, setEditOpen] = React.useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () =>{
    setCurrentId("");
    setEditOpen(false);
  } 
  const {token} = controller;
  
  const author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const [loading, setLoading] = useState(false);
  const [valaya, setValaya] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [removeId, setRemoveId] = useState("");
  const [deleteId, setDeleteId] = useState("alal");

  var dam = "";
  
  const openModal = (e) => {
    setDeleteId(e);
    dam = e;
    console.log(deleteId);
  };

  const deleteRemove = () => {
    setRemoveId(dam);
  };

  const getData = () => {
    setLoading(true);
    fetch("http://spyss.dollopinfotech.com/getUpaValayaListApi?page=-1&size=10",{
      headers: {
        "Content-type": "application/json",
        "authorization":`Bearer ${localStorage.getItem("token")}`
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((json) => {
        console.log(`Bearer ${token}`);
console.log(json.response.upaValayas)
        const temp = [];
        json.response.upaValayas.map((j) => {
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
                  {j.upaValayaId}
                </MDTypography>
              ),
              // name: <author name={j.upaValayaName} />,
              name: j.upaValayaName ,

              // District: (
              //   <MDTypography
              //     component="a"
              //     href="#"
              //     variant="caption"
              //     color="text"
              //     fontWeight="medium"
              //   >
              //     {j.valaya.valayaName}
              //   </MDTypography>
              // ),
              // Description: (
              //   <MDTypography
              //     component="a"
              //     href="#"
              //     variant="caption"
              //     color="text"
              //     fontWeight="medium"
              //   >
              //     {j.areas[0].areaName}
              //   </MDTypography>
              // ),
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
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      <DeleteIcon
                        onClick={() => openModal(j.uuid)}
                        data-bs-toggle="modal"
                        data-bs-target="#myModal"
                      ></DeleteIcon>
                      <div id="myModal" class="modal fade">
                        <div class="modal-dialog modal-confirm">
                          <div class="modal-content">
                            <div class="modal-header flex-column">
                              <div class="icon-box">
                                <i
                                  class="material-icons"
                                  type="button"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                >
                                  &#xE5CD;
                                </i>
                              </div>
                              <h4 class="modal-title w-100">Are you sure?</h4>
                             
                            </div>
                            <div class="modal-body">
                              <p>
                                Do you really want to delete these records? This process cannot be
                                undone.
                              </p>
                            </div>
                            <div class="modal-footer justify-content-center">
                              <button
                                type="button"
                                class="btn btn-secondary"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                onClick={deleteRemove}
                                class="btn btn-danger"
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

  const remove = (id) => {
    console.log("id+>", id);

    fetch(`http://spyss.dollopinfotech.com/deleteUpaValayaApi/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "authorization":`Bearer ${localStorage.getItem("token")}`
      }
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
    if (removeId) {
      remove(removeId);
    }
  }, [removeId]);

  // useEffect(() => {
  //   getData();
  // }, []);

  useEffect(() => {
    getData()
  },[upaValayaTable]);


  return {
    columns: [
      { Header: "Upa valaya Id", accessor: "Id", align: "left" },
      { Header: "UpaValayaName", accessor: "name", align: "left" },
      // { Header: "ValayaName ", accessor: "District", align: "left" },
      // { Header: "AreaName", accessor: "Description", align: "left" },
      { Header: "Upa actions", accessor: "actions", align: "left" },
    ],
    rows: valaya,
    handleEditClose,
    handleEditOpen,
    editOpen,
    currentId,
    loading,
  };
}
