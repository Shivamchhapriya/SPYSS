import * as React from "react";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MDTypography from "components/MDTypography";
import { useMaterialUIController } from "context";

export default function batchInBranchTable() {
  const [controller] = useMaterialUIController();
  const [editOpen, setEditOpen] = React.useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);
  const { token } = controller;

  const [loading, setLoading] = useState(false);
  const [batch, setBatch] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [removeId, setRemoveId] = useState("");

  const getData = () => {
    setLoading(true);
    fetch("http://spyss.dollopinfotech.com/valaya/?page=0&size=55", {
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
        console.log(`Bearer ${token}`);
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
                  1
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
                  Branch Name
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
                          setCurrentId(j.valayaId);
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
                          setRemoveId(j.id);
                        }}
                      />
                    </div>
                  </MDTypography>
                </>
              ),
            });
          }
          return "";
        });
        setBatch(temp);
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
    fetch(`http://spyss.dollopinfotech.com/valaya/${id}`, {
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
    if (removeId) {
      remove(removeId);
    }
  }, [removeId]);

  useEffect(() => {
    getData();
  }, []);

  return {
    columns: [
      { Header: "Id", accessor: "Id", align: "left" },
      { Header: "Country", accessor: "Country", align: "left" },
      { Header: "State", accessor: "State", align: "left" },
      { Header: "City", accessor: "City", align: "left" },
      { Header: "UPAValaya", accessor: "UPAValaya", align: "left" },
      { Header: "Area", accessor: "Area", align: "left" },
      { Header: "BranchName", accessor: "BranchName", align: "left" },
      { Header: "Actions", accessor: "Actions", align: "left" },
    ],

    rows: batch,
    handleEditClose,
    handleEditOpen,
    editOpen,
    currentId,
    loading,
  };
}
