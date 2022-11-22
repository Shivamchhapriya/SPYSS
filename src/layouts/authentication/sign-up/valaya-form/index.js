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
import CloseIcon from '@mui/icons-material/Close';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import TextField from '@mui/material/TextField';
import signupschemas from "schema";
import { useFormik } from "formik";

import MDButton from "components/MDButton";
import { FormControl, Grid, InputLabel, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import valayaTableData from "layouts/tables/tablesData/data/valayaTableData";
import { getRequest } from "examples/apiHandler";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { postRequest } from "examples/apiHandler";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
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

function ValayaForm({ id = "", row,handleClose, handleEditClose, setOpenSnackbar, setSnackbar ,}) {
  const {valayaTable,setValayaTable} = useContext(authContext);

  const [valayaName, setValayaName] = useState("");
  const [dropdownCountry, setDropdownCountry] = useState("");
  const [dropdownState, setDropdownState] = useState("");
  const [cityName, setCityName] = React.useState([]);

  const [country, setCountry] = React.useState([]);
  const [state, setState] = React.useState([]);
  const [city, setCity] = React.useState([]);






    const temp = {
    countryUuid: dropdownCountry,
    stateUuid: dropdownState,
    citiesUuid: cityName,
    valayaName: valayaName,
  };


 
 

const update = async (temp) => {
 



if(valayaName != "" && dropdownCountry != "" && dropdownState != "" && cityName.length != 0){
    if (id !== "") {
      var editValayaData = {
        valayaUuid:id.uuid,
        countryUuid: dropdownCountry,
        stateUuid: dropdownState,
        citiesUuid: cityName,
        valayaName: valayaName,
    }
      
      await  handleEditClose()
        const res = await putRequest("/editValayaApi", editValayaData);
        await res.message==="created"?setOpenSnackbar(true):setOpenSnackbar(false)
        setValayaTable(!valayaTable)
        setSnackbar("update Valaya successfully")
        return
      }else{    
        await handleClose();
      const res = await postRequest("/addValayaApi", temp);
      await res.message==="created"?setOpenSnackbar(true):setOpenSnackbar(false)
      setValayaTable(!valayaTable)
      setSnackbar("valaya created successfully")
    }
}
     
};




  useEffect(async () => {
    if (dropdownCountry) {
      const st = await getRequest(`/getStateListApi/${dropdownCountry}`)
      setState(st.response);
      setCity([])
    }
     else {
    const con = await getRequest("/getCountryListApi/");
    setCountry(con.response);
    }
  }, [dropdownCountry]);
  
  useEffect(async() => {
    if(dropdownState){
      const ci = await getRequest(`/getCityListApi/${dropdownState}`);
      setCity(ci.response);
    }
  }, [dropdownState])

 
  useEffect(() => {
    if (id !== "") {
      var totalCity = []
      setValayaName(row.valayaName);
      setDropdownCountry(row.country.uuid);
      setDropdownState(row.state.uuid)
      row.city.map((j)=>{
          totalCity.push(j.uuid)
        })
        setCityName(totalCity)
    }
  }, [id]);

const closeModal =()=>{
  if (id !== "") {
    handleEditClose()
    return
  }
  else{
  handleClose()
}
}

const initialValues = {
  Name: '',
  droCountrys: '',
  DropdownStatsdata: '',
  dropcitydata: '',
}

const { values, touched, handleSubmit, handleChange, errors, handleBlur } = useFormik
    ({
      initialValues: initialValues,
      validationSchema: signupschemas,
      onSubmit: (value) => {
        console.log(value)
    }

    })
    const handleChangeCity = (event) => {
      const {
        target: { value },
      } = event;
      setCityName(
        typeof value === "string" ? value.split(",") : value
        );
        // handleChange()
  
    };
  
  
  return (
    <>
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
              <MDTypography   variant="h6" color="white">
                Valaya Form 
              </MDTypography >
              <Typography>
                 <CloseIcon sx={{cursor:"pointer"}} onClick={()=>closeModal()}/>
          </Typography>
          </Typography>
            </MDBox>
            <MDBox pt={3}>
              <Card>
                <MDBox pt={4} pb={3} px={3}>
                  <MDBox component="form" role="form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item lg={12} xs={12} mb={2} md={12}>
                        <MDInput
                          type="text"
                          label="Valaya Name"
                          name="Name"
                          // value={valayaName}
                          onChangeCapture={(e) => setValayaName(e.target.value)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="standard"
                          fullWidth
                          error={errors.Name && touched.Name ? true :false}
                        />
                        {errors.Name && touched.Name ? (<p style={{ color: "#F44335",fontSize: "0.75rem", marginLeft: "1rem",fontStyle: "none",}}  className="text-red">{errors.Name}</p>) : null}

                      </Grid>
                      <Grid item lg={12} xs={12} mb={2} md={12}>
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                          <InputLabel  id="demo-simple-select-autowidth-label">Country </InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            // value={dropdownCountry}
                            // onChange={(e) => setDropdownCountry(e.target.value)}
                            onChange={handleChange}
                            onBlur={(e) => { e.target.value === undefined ? "" : setDropdownCountry(e.target.value) }}
                            name="droCountrys"
                            autoWidth
                            label="data"
                            input={<OutlinedInput label="Countries" />}
                            error={errors.droCountrys &&  touched.droCountrys ? true :false}

                          >
                            {country.map((list, index) => {
                              return (
                                <MenuItem value={list.uuid} key={index}>
                                  {list.name}
                                </MenuItem>
                              
                              );
                            })}
                          </Select>
                          {errors.droCountrys && touched.droCountrys ? (<p style={{ color: "#F44335",fontSize: "0.75rem", marginLeft: "1rem",fontStyle: "none",}}  className="text-red">{errors.droCountrys}</p>) : null}

                        </FormControl>
                      </Grid>
                      <Grid item lg={12} xs={12} mb={2} md={12}>
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                          <InputLabel id="demo-simple-select-autowidth-label">State </InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            // value={dropdownState}
                            // onChange={(e) => setDropdownState(e.target.value)}
                            onChange={handleChange}
                            onBlur={(e) => { e.target.value === undefined ? "" : setDropdownState(e.target.value) }}
                           
                            name="DropdownStatsdata"
                            autoWidth
                            label="data"
                            input={<OutlinedInput label="States" />}
                            error={errors.DropdownStatsdata && touched.DropdownStatsdata  ? true :false}

                          >
                            {state.map((list, index) => {
                              return (
                                <MenuItem value={list.uuid} key={index}>
                                  {list.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                          {errors.DropdownStatsdata && touched.DropdownStatsdata ? (<p style={{ color: "#F44335",fontSize: "0.75rem", marginLeft: "1rem",fontStyle: "none",}}  className="text-red">{errors.DropdownStatsdata}</p>) : null}

                        </FormControl>
                      </Grid>
                      <Grid item lg={12} xs={12} mb={2} md={12}>
                        <FormControl sx={{ m: 1, width: 300 }}>
                          <InputLabel id="demo-multiple-checkbox-label">District </InputLabel>
                          <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={cityName}
                            onChange={handleChangeCity}

                            // onChangeCapture={handleChange}

                            input={<OutlinedInput label="District"/>}

                            onBlur={handleChange}
                            // onBlur={(e)=>handleChange(e.target.value)}
                            // onChange={handleChange}
                            // onKeyUp={handleChangeCity}
                            name='dropcitydata'
                            error={errors.dropcitydata && touched.dropcitydata  ? true :false}
                            renderValue={
                              (selected) => 
                              city.filter( name => selected.includes(name.uuid) )
                                      .map( record => record.name )
                                      .join(", ")
                          }
                            // renderValue={(selected) => selected.join(', ')}
                            // renderValue={(selected) => {
                            //   selected = selected.map((e) => cityName.find((name) => name == e));
                            //   selected = selected.map((e) => e.cityName);
                            //   return selected.join(", ");
                            // }}
                            MenuProps={MenuProps}
                          >
                            {city.map((list, index) => (
                              <MenuItem key={list.uuid} value={list.uuid} >
                                <Checkbox  checked={cityName.indexOf(list.uuid) > -1} />
                                <ListItemText primary={list.name} />
                              </MenuItem>
                            ))}
                            
                          </Select>
                          {errors.dropcitydata && touched.dropcitydata ? (<p style={{ color: "#F44335",fontSize: "0.75rem", marginLeft: "1rem",fontStyle: "none",}}  className="text-red">{errors.dropcitydata}</p>) : null}

                        </FormControl>
                      </Grid>
                    </Grid>
                    <MDBox mt={4} mb={1}>
                      <MDButton
                        variant="gradient"
                        color="info"
                        type="submit"
                        fullWidth
                        onClick={() => {
                          update(temp);
                        }}
                      >
                        {!id ? "Add Valaya" : "Update Valaya"}
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
    </>
  );
}

export default ValayaForm;
