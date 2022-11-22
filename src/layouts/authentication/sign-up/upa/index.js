/* eslint-disable */
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

// react-router-dom components
// import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
// import Checkbox from "@mui/material/Checkbox";
import React from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import CloseIcon from '@mui/icons-material/Close';

import MDButton from "components/MDButton";
import { FormControl, Grid, InputLabel, MenuItem, Select, Typography,TextField } from "@mui/material";
import { useEffect, useState } from "react";
import valayaTableData from "layouts/tables/tablesData/data/valayaTableData";
import { getRequest } from "examples/apiHandler";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { postRequest } from "examples/apiHandler";
import axios from "axios";
import { authContext } from "context/TableState";
import { useContext } from "react";
import { putRequest } from "examples/apiHandler";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function UpaForm({ id = "", row, handleClose, handleEditClose, setOpenSnackbar, setSnackbar }) {
  const {upaValayaTable,setUpaValayaTable} = useContext(authContext);

  const [upavalayaName, setUpavalayaName] = useState("");
  const [dropdownvalaya, setDropdownvalaya] = useState("");
  const [areaname, setAreaname] = React.useState([]);
  const [valaya, setValaya] = React.useState([]);
  const [area, setArea] = React.useState([]);
  const { getData } = valayaTableData();
  const temp = {
    valayaUuid: dropdownvalaya,
    areaUuid: areaname,
    upaValayaName: upavalayaName,
  };
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setAreaname(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const update = async (temp) => {

    if(id!== ""){debugger
     var editUpaValayaData = {
        upaValayaUuid:id.uuid,
        upaValayaName:upavalayaName,
        valayaUuid:dropdownvalaya,
        areasUuid:areaname,
    }
    console.log('>>>>>>>>>>>>>>>>>>>',editUpaValayaData)
      console.log("temp,=>", editUpaValayaData);
      const res = await putRequest("/editUpaValayaApi/", editUpaValayaData);
      await res.message==="created"?setOpenSnackbar(true):setOpenSnackbar(false)
      handleEditClose();
      setUpaValayaTable(!upaValayaTable);
      setSnackbar("valaya created successfully")
    }else{
    
    console.log("temp,=>", temp);
    const res = await postRequest("/addUpaValayaApi", temp);
    await handleClose();
    await res.message==="created"?setOpenSnackbar(true):setOpenSnackbar(false)
    setUpaValayaTable(!upaValayaTable);
    setSnackbar("valaya created successfully")
  }
};
  useEffect(() => {
    if (id !== "") {
      // const {
      //   name: {
      //     props: { name: uservalayaName },
      //   },
      //   District: {
      //     props: { children: valayaDistrictsvalayaName },
      //   },
      //   Description: {
      //     props: { children },
      //   },
      // } = row;
    console.log(row)
    var totalCity = []
    setUpavalayaName(row.upaValayaName)
    setDropdownvalaya(row.valaya.uuid)

    row.area.map((j)=>{
      totalCity.push(j.uuid)
    })
    setAreaname(totalCity)

    }
  }, [id]);
  useEffect( async  () => {
      const st = await axios.get(`http://spyss.dollopinfotech.com/getValayaListApi`).then(res=>{
        console.log("upaValaya", res.data.response.valayas);
        setValaya(res.data.response.valayas);
  });
},[]);
useEffect( async  () => {
  if(dropdownvalaya){
  const st = await axios.get(`http://spyss.dollopinfotech.com/getAreaListByValayaApi/${dropdownvalaya}`).then(res=>{
    console.log("upaValaya", res.data.response);
    setArea(res.data.response);
});
  }
},[dropdownvalaya]);
 

  const closeModal =()=>{
    if(id !==""){

      handleEditClose()
      return
    }else{

      handleClose()
    }
  }
  return (
    <MDBox pt={6} pb={3}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >

             <Typography sx={{display:"flex" ,justifyContent:"space-between"}} >
              <MDTypography variant="h6" color="white">
              Upa Valaya Form   
              </MDTypography>
              <Typography>

              <CloseIcon  onClick={()=>closeModal()}/>
              </Typography>
              </Typography>
            </MDBox>
            <MDBox pt={3}>
              <Card>
                <MDBox pt={4} pb={3} px={3}>
                  <MDBox component="form" role="form">
                    <Grid container spacing={2}>
                      <Grid item lg={12} xs={12} mb={2} md={12}>
                        <MDInput
                          type="text"
                          label="Upa Valaya Name"
                          value={upavalayaName}
                          onChange={(e) => setUpavalayaName(e.target.value)}
                          variant="standard"
                          fullWidth
                        />
                      </Grid>
                      <Grid item lg={12} xs={12} mb={2} md={12}>
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                          <InputLabel id="demo-simple-select-autowidth-label">Select Valaya</InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={dropdownvalaya}
                            onChange={(e) => setDropdownvalaya(e.target.value)}
                            autoWidth
                            label="data"
                            input={<OutlinedInput label="Select Valaya" />}

                          >
                            {valaya.map((list, index) => {
                              return (
                                
                                <MenuItem value={list.uuid} key={index} >
                                  {list.valayaName}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                      {/* <Grid item lg={12} xs={12} mb={2} md={12}>
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                          <InputLabel id="demo-simple-select-autowidth-label">Select Locality/village</InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={dropdownState}
                            onChange={(e) => setDropdownState(e.target.value)}
                            autoWidth
                            label="data"
                          >
                            {state.map((list, index) => {
                              return (
                                <MenuItem value={list} key={index}>
                                  {list.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid> */}


                      <Grid item lg={12} xs={12} mb={2} md={12}>
                        <FormControl sx={{ m: 1, width: 300 }}>
                          <InputLabel id="demo-multiple-checkbox-label">Locality/Village</InputLabel>
                          <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={areaname}
                            onChange={handleChange}
                            input={<OutlinedInput label="Locality/Village" />}
                            renderValue={
                              (selected) => 
                              area.filter( areaName => selected.includes(areaName.uuid) )
                                      .map( record => record.areaName )
                                      .join(", ")
                          }
                            MenuProps={MenuProps}
                          >
                             {area.map((list, index) => (
                              <MenuItem key={list.uuid} value={list.uuid}>
                                <Checkbox checked={areaname.indexOf(list.uuid) > -1} />
                                <ListItemText primary={list.areaName} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <MDBox mt={4} mb={1}>
                      <MDButton
                        variant="gradient"
                        color="info"
                        fullWidth
                        onClick={() => {
                          update(temp);
                        }}
                      >
                        {!id ? "Add Upa Valaya" : "Update Upa Valaya"}
                      </MDButton>
                    </MDBox>
                  </MDBox>
                </MDBox>
              </Card>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default UpaForm;
