/* eslint-disable */
import * as React from "react";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MDTypography from "components/MDTypography";
import { useMaterialUIController } from "context";
import { authContext } from "context/TableState";

export default function branchInAreaTable() {
  const [controller] = useMaterialUIController();
  const {branchinAreaTable,setBranchinAreaTable} = React.useContext(authContext);

  const [editOpen, setEditOpen] = React.useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);
  const { token } = controller;

  const [loading, setLoading] = useState(false);
  const [branchArea, setBranchArea] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [removeId, setRemoveId] = useState("");

  const [deleteId, setDeleteId] = useState("alal");
  let dam = "";
  const openModal = (e) => {
    setDeleteId(e)
    dam = e;
    console.log(deleteId);
  }
  const deleteRemove = () => {
    setRemoveId(dam);
  }
  const getData = () => {
    setLoading(true);
    fetch("http://spyss.dollopinfotech.com/getBranchListApi?page=-1&size=10", {
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
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
        const temp = [];
        console.log(temp)
        json.response.branches.map((j) => {
          console.log(j)
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
                  {j.branchId}
                </MDTypography>
              ),

              Country: (
                <MDTypography
                  component="a"
                  href="#"
                  variant="caption"
                  color="text"
                  fontWeight="medium"
                >
                  Country
                </MDTypography>
              ),
              State: (
                <MDTypography
                  component="a"
                  href="#"
                  variant="caption"
                  color="text"
                  fontWeight="medium"
                >
                  State
                </MDTypography>
              ),
              Valaya: (
                <MDTypography
                  component="a"
                  href="#"
                  variant="caption"
                  color="text"
                  fontWeight="medium"
                >
                  Valaya
                </MDTypography>
              ),
              City: (
                <MDTypography
                  component="a"
                  href="#"
                  variant="caption"
                  color="text"
                  fontWeight="medium"
                >
                  City
                </MDTypography>
              ),
              UPAValaya: (
                <MDTypography
                  component="a"
                  href="#"
                  variant="caption"
                  color="text"
                  fontWeight="medium"
                >
                  UpaValaya
                </MDTypography>
              ),
              Area: (
                <MDTypography
                  component="a"
                  href="#"
                  variant="caption"
                  color="text"
                  fontWeight="medium"
                >
                  Area
                </MDTypography>
              ),
              BranchName: (
                <MDTypography
                  component="a"
                  href="#"
                  variant="caption"
                  color="text"
                  fontWeight="medium"
                >
                  {j.branchName}
                </MDTypography>
              ),
              Actions: (
                <>
                  <MDTypography component="div" variant="caption" color="text" fontWeight="medium">
                    <div
                      style={{
                        fontSize: "2em",
                        borderRadius: "6px",
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
                  <MDTypography
                    component="a"
                    href="#"
                    variant="caption"
                    color="text"
                    fontWeight="medium"
                  >
                    <div style={{ fontSize: "2em", borderRadius: "6px" }}>
                      <DeleteIcon
                        onClick={() => {
                          openModal(j.uuid);
                        }}
                        data-bs-toggle="modal" data-bs-target="#myModal"
                      // <DeleteIcon onClick={()=>openModal(j.uuid)}  data-bs-toggle="modal" data-bs-target="#myModal" ></DeleteIcon>
                      />
                      <div id="myModal" className="modal fade">
                        <div className="modal-dialog modal-confirm">
                          <div className="modal-content">
                            <div className="modal-header flex-column">
                              <div className="icon-box">
                                <i className="material-icons" type="button" data-bs-dismiss="modal" aria-label="Close">&#xE5CD;</i>
                              </div>
                              <h4 className="modal-title w-100">Are you sure?</h4>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                            </div>
                            <div className="modal-body">
                              <p>Do you really want to delete these records? This process cannot be undone.</p>
                            </div>
                            <div className="modal-footer justify-content-center">
                              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                              <button type="button" onClick={deleteRemove} className="btn btn-danger" data-bs-dismiss="modal" aria-label="Close">Delete</button>
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
        setBranchArea(temp);
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
    fetch(`http://spyss.dollopinfotech.com/deleteBranchApi/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((response) => {
        console.log('respons delet', response)
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

  useEffect(() => {
    getData();
  }, [branchinAreaTable]);

  return {
    columns: [
      { Header: "Id", accessor: "Id", align: "left" },
      { Header: "BranchName", accessor: "BranchName", align: "left" },

      { Header: "Country", accessor: "Country", align: "left" },
      { Header: "State", accessor: "State", align: "left" },
      { Header: "City", accessor: "City", align: "left" },
      { Header: "UPAValaya", accessor: "UPAValaya", align: "left" },
      { Header: "Area", accessor: "Area", align: "left" },
      { Header: "Actions", accessor: "Actions", align: "left" },
    ],




    rows: branchArea,
    handleEditClose,
    handleEditOpen,
    editOpen,
    currentId,
    loading,
  };
}
