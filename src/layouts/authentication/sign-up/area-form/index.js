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
import React, { useContext } from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CloseIcon from '@mui/icons-material/Close';

import { FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import valayaTableData from "layouts/tables/tablesData/data/valayaTableData";
import { getRequest } from "examples/apiHandler";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { postRequest } from "examples/apiHandler";
import TextField from '@mui/material/TextField';
import { authContext } from "context/TableState";
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

function AreaForm({ id = "", row, handleClose, handleEditClose, setOpenSnackbar, setSnackbar }) {
  const {areaTable,setAreaTable} = useContext(authContext);

  const [areaName, setAreaName] = useState("");
  const [dropdownCountry, setDropdownCountry] = useState("");
  const [dropdownState, setDropdownState] = useState("");
  const [cityName, setCityName] = React.useState("");
  const [country, setCountry] = React.useState([]);
  const [state, setState] = React.useState([]);
  const [city, setCity] = React.useState([]);
  const { getData } = valayaTableData();
  const temp = {
   
    cityUuid: cityName,
    areaName: areaName,
  };
  
  // const handleChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setCityName(
  //     typeof value === "string" ? value.split(",") : value
  //   );
  // };
  const update = async (temp) => {

    if (id !== "") {
      var editAreaData= {
        areaUuid:row.uuid,
        cityUuid:cityName,
        areaName:areaName,
    }
    console.log("Edit valaya data"+JSON.stringify(editAreaData));
    const res = await putRequest("/editAreaApi", editAreaData);
    await  handleEditClose()

    await res.message==="created"?setOpenSnackbar(true):setOpenSnackbar(false)
    setAreaTable(!areaTable)
    setSnackbar("update Valaya successfully")
    return

    }else{debugger
    console.log("temp,=>", temp);
    const res = await postRequest("/addAreaApi/", temp);
    // console.log("AREA POST",res)
    await handleClose();
    await res.message === "created" ? setOpenSnackbar(true) : setOpenSnackbar(false);
    setAreaTable(!areaTable)
    setSnackbar("valaya created successfully")
    }

  };
  useEffect(() => {
    if (id !== "") {
      
    //     name: {
    //       props: { name: uservalayaName },
    //     },
    //     District: {
    //       props: { children: valayaDistrictsvalayaName },
    //     },
    //     Description: {
    //       props: { children },
    //     },
    //   } = row;
    //
    
    setAreaName(row.areaName)
    setDropdownCountry(row.country.uuid)
    setDropdownState(row.state.uuid)
    setCityName(row.city.uuid)  
      console.log("area Row -----------------------",JSON.stringify(row));

    }
  }, [id]);



  useEffect(async () => {
    if (dropdownCountry) {
      const st = await getRequest(`/getStateListApi/${dropdownCountry}`);
      console.log("states", st);
      setState(st.response);
      setCity([])
    }
    else {
      const con = await getRequest("/getCountryListApi/");
      console.log("country", con.response);
      setCountry(con.response);
    }
  }, [dropdownCountry]);
  useEffect(async () => {
    if(dropdownState){
    const ci = await getRequest(`/getCityListApi/${dropdownState}`);
    console.log("cityAman===>",ci.response);
    setCity(ci.response);
  }

  }, [dropdownState])


 

  const closeModal =()=>{
    if (id !== "") {
     
      handleEditClose()
      return
    }
    else{
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
              Locality/village Form 
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
                       
                        <TextField
                          type="text"
                          label="Locality/village Name"
                          value={areaName}
                          onChange={(e) => setAreaName(e.target.value)}
                          variant="standard"
                          fullWidth
                          id="standard-basic"
                          margin="normal"
                        />
                      </Grid>

{/* ==   <TextField id="standard-basic" label="Standard" variant="standard" />*/}
{/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}


                      <Grid item lg={12} xs={12} mb={2} md={12}>
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                          <InputLabel id="demo-simple-select-autowidth-label">Countries</InputLabel>
                         <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={dropdownCountry}
                            onChange={(e) => setDropdownCountry(e.target.value)}
                            autoWidth
                            label="data"
                            input={<OutlinedInput label="Countries" />}
                          >
                            {console.log("Countryyyyyyyyyyyyyyyyy",dropdownCountry)}
                            {country.map((list, index) => {
                              return (
                                <MenuItem value={list.uuid} key={index}>
                                  {list.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item lg={12} xs={12} mb={2} md={12}>
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                          <InputLabel id="demo-simple-select-autowidth-label">States</InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={dropdownState}
                            onChange={(e) => setDropdownState(e.target.value)}
                            autoWidth
                            label="data"
                            input={<OutlinedInput label="States" />}

                          >
                            {console.log("Stateeeeeeeeeeeeeeeeeeeeeeeee",dropdownState)}
                            {state.map((list, index) => {
                              return (
                                <MenuItem value={list.uuid} key={index}>
                                  {list.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item lg={12} xs={12} mb={2} md={12}>
                        <FormControl sx={{ m: 1, width: 300 }}>
                          <InputLabel id="demo-multiple-checkbox-label">District</InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={cityName}
                            onChange={(e)=>setCityName(e.target.value)}
                            autoWidth
                            label="data"
                            input={<OutlinedInput label="District" />}
                          >
                            {/* {console.log("Cityyyyyyyyyyyyyyyyy",cityName)} */}
                            {city.map((list) => (
                                <MenuItem value={list.uuid} >  
                                  {list.name}
                                </MenuItem>)
                            )}
                          </Select>
                          
                          
                          
                          
                          {/* <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={cityName}
                            onChange={handleChange}
                            input={<OutlinedInput label="District" />}
                            // renderValue={(selected) => selected.join(', ')}
                            // renderValue={(selected) => {
                            //   selected = selected.map((e) => city.find((list) => name.uuid == e));
                            //   selected = selected.map((e) => e.cityName);
                            //   return selected.join(", ");
                            // }}
                            // renderValue={(selected) => selected.map(obj=> city[obj - 1].name).join(", ")}

                            renderValue={
                              (selected) => 
                              city.filter( name => selected.includes(name.uuid) )
                                      .map( record => record.name )
                                      .join(", ")
                          } 

                            MenuProps={MenuProps}
                          >
                            {city.map((list) => (
                              // console.log(list),
                              <MenuItem key={list.uuid} value={list.uuid} >
                                <Checkbox  checked={cityName.indexOf(list.uuid) > -1} />
                                <ListItemText primary={list.name} />
                              </MenuItem>
                            ))}
                          </Select> */}
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
                        {!id ? "Add Locality/village" : "Update Locality/village"}
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

export default AreaForm;
