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
import CloseIcon from '@mui/icons-material/Close';

import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { FormControl, Grid, InputLabel, MenuItem, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import valayaTableData from "layouts/tables/tablesData/data/valayaTableData";
import { getRequest } from "examples/apiHandler";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { postRequest } from "examples/apiHandler";
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
import Joi from "joi-browser";
import axios from "axios";

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




function BranchInAreaForm({ id = "", row, handleClose, handleEditClose, setOpenSnackbar, setSnackbar }) {



 
 
  const[wings,setWings]=useState([]);
  const [formValueAll,setFormValueAll]=useState({
    dropdownCountry:"",dropdownState:"",dropdowanValaya:"",dropdowncity:"",UPAvalayaNamecity:""
  });

  const [formValue,setFormValue]=useState({
    BranchName:"",  dropdownCountry:"",dropdownState:"",dropdowanValaya:"",dropdowncity:"",UPAvalayaNamecity:"",type:"",batchtype:"",TimeZone:"",BatchStartDate:"",BatchStartTime:"",BatchEndTime:"",mukyaShikshakName:"",mukyaShikshakEmail:"",mukyaShikshakContactNumber:"",sahaShikshak1Name:"",SahaShikshak1ContactNumber:"",SahaShikshak2Name:"",SahaShikshak2ContactNumber:"",status:"",reason:"",wings:[]
  });

  const [formValueId,setFormValueId]=useState({
    dropdownCountry:"",dropdownState:"",dropdowanValaya:"",dropdowncity:"",UPAvalayaNamecity:""
  });

  
  const [country, setCountry] = React.useState([]);
  const [state, setState] = React.useState([]);
  const [valaya, setValaya] = React.useState([]);
  const [district, setDistrict] = React.useState([]);

  const [valayaNameState, setValayaNameState] = React.useState("");
  const [upavalaya, setUpavalya] = React.useState([]);

  const [offlineBtn, setOfflineBtn] = useState(false)
  const [snack, setSnack] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
  const { vertical, horizontal, open } = snack;

  // const [valaya, setValaya] = React.useState([]);
  const { getData } = valayaTableData();
  const [errors, setErrors] = useState({});
  const schema = {
    BranchName:Joi.string().required(),
    dropdownCountry:Joi.string().required(),
    dropdownState:Joi.string().required(),
    dropdowanValaya:Joi.string().required(),
    dropdowncity:Joi.string().required(),
    UPAvalayaNamecity:Joi.string().required(),
    BatchCategory:Joi.string().required(),
    type:Joi.string().required(),
    batchtype:formValue.type==="offline"?Joi.string().required():Joi.string().allow(""),
    TimeZone:Joi.string().required(),
    BatchStartDate:Joi.string().required(),
    BatchStartTime:Joi.string().required(),
    BatchEndTime:Joi.string().required(),
    mukyaShikshakName:Joi.string().required(),
    mukyaShikshakEmail:Joi.string().required(),
    mukyaShikshakContactNumber:Joi.string().required(),
    sahaShikshak1Name:Joi.string().required(),
    SahaShikshak1ContactNumber:Joi.string().required(),
    SahaShikshak2Name:Joi.string().required(),
    SahaShikshak2ContactNumber:Joi.string().required(),
    status:Joi.string().required(),
    reason:Joi.string().required(),
    wings:Joi.array().items().min(1).required(),
  };
  
  const validateForm = (event) => {
    const result = Joi.validate(formValue, 
        schema, { abortEarly: false });
    console.log(result);
    const { error } = result;
    if (!error) {
      update();
      return null;
    } else {
      const errorData = {};
      for (let item of error.details) {
        const name = item.path[0];
        const message = item.message;
        errorData[name] = message;
      }
      console.log(errors);
      setErrors(errorData);
      return errorData;
    }
  };
  
  const handleSave = (event) => {
    const { name, value } = event.target;
    let errorData = { ...errors };
    const errorMessage = validateProperty(event);
    if (errorMessage) {
      errorData[name] = errorMessage;
    } else {
      delete errorData[name];
    }
    let customerData = { ...formValue };
    customerData[name] = value;
    setFormValue(customerData);
    setErrors(errorData);
  };
  const handleCountry = (event) => {
  
    console.log(event,"===>>>>>")
    const { name, value } = event.target;
    let errorData = { ...errors };
    const errorMessage = validatePropertyCountry(event);
    if (errorMessage) {
      const str = errorMessage.replace(/"/g , '');
  const str2 = str.charAt(0).toUpperCase() + str.slice(1);
      errorData[name] = str2;
    } else {
      delete errorData[name];
    }
    console.log(value);
    let customerDataAll = { ...formValueAll };
    customerDataAll[name] = value;
 
    setFormValueAll(customerDataAll); 
    let customerData = { ...formValue };
    customerData[name] = value.name;
 
    setFormValue(customerData); 
     let customerDataId = { ...formValueId };
 
    customerDataId[name] = value.uuid;
    setFormValueId(customerDataId);
    setErrors(errorData);
  };
  const validatePropertyCountry = (event) => {
    const { name, value } = event.target;
    const obj = { [name]: value.name };
    const subSchema = { [name]: schema[name] };
    const result = Joi.validate(obj, subSchema);
    const { error } = result;
    return error ? error.details[0].message : null;
  };
  const validateProperty = (event) => {
    const { name, value } = event.target;
    const obj = { [name]: value };
    const subSchema = { [name]: schema[name] };
    const result = Joi.validate(obj, subSchema);
    const { error } = result;
    return error ? error.details[0].message : null;
  };
  const handleValaya = (event) => {
  
    console.log(event,"===>>>>>")
    const { name, value } = event.target;
    let errorData = { ...errors };
    const errorMessage = validatePropertyValaya(event);
    if (errorMessage) {
      const str = errorMessage.replace(/"/g , '');
  const str2 = str.charAt(0).toUpperCase() + str.slice(1);
      errorData[name] = str2;
    } else {
      delete errorData[name];
    }
    console.log(value);
    let customerDataAll = { ...formValueAll };
    customerDataAll[name] = value;
 
    setFormValueAll(customerDataAll); 
    let customerData = { ...formValue };
    customerData[name] = value.valayaName;
 
    setFormValue(customerData); 
     let customerDataId = { ...formValueId };
 
    customerDataId[name] = value.uuid;
    setFormValueId(customerDataId);
    setErrors(errorData);
  };
  const validatePropertyValaya = (event) => {
    const { name, value } = event.target;
    const obj = { [name]: value.valayaName};
    const subSchema = { [name]: schema[name] };
    const result = Joi.validate(obj, subSchema);
    const { error } = result;
    return error ? error.details[0].message : null;
  };
  const handleUpvalaya = (event) => {
  
    console.log(event,"===>>>>>")
    const { name, value } = event.target;
    let errorData = { ...errors };
    const errorMessage = validatePropertyUpValaya(event);
    if (errorMessage) {
      const str = errorMessage.replace(/"/g , '');
  const str2 = str.charAt(0).toUpperCase() + str.slice(1);
      errorData[name] = str2;
    } else {
      delete errorData[name];
    }
    console.log(value);
    let customerDataAll = { ...formValueAll };
    customerDataAll[name] = value;
 
    setFormValueAll(customerDataAll); 
    let customerData = { ...formValue };
    customerData[name] = value.upaValayaName;
 
    setFormValue(customerData); 
     let customerDataId = { ...formValueId };
 
    customerDataId[name] = value.uuid;
    setFormValueId(customerDataId);
    setErrors(errorData);
  };
  const validatePropertyUpValaya= (event) => {
    const { name, value } = event.target;
    const obj = { [name]: value.upaValayaName };
    const subSchema = { [name]: schema[name] };
    const result = Joi.validate(obj, subSchema);
    const { error } = result;
    return error ? error.details[0].message : null;
  };
  // const temp = {
  //   countryUuid: formValue.dropdownCountry.uuid,
  //   stateUuid: formValue.dropdownState.uuid,
  //   valayaUuid: formValue.dropdowanValaya,
  //   cityUuid: formValue.dropdowncity,
  //   upaValayaUuid: formValue.UPAvalayaNamecity,
  //   branchName: formValue.BranchName,
  //   nearestLandmark: formValue.type,

  //   batchStartDate: formValue.BatchStartDate,
  //   batchStartTime: formValue.BatchStartTime,
  //   batchEndTime: formValue.BatchEndTime,

  //   mukyaShikshakName: mukyaShikshakName,
  //   mukyaShikshakEmail: mukyaShikshakEmail,
  //   mukyaShikshakContactNumber: mukyaShikshakContactNumber,
  //   sahaShikshakOneName: sahaShikshak1Name,
  //   shahShikshakOneContactNumber: SahaShikshak1ContactNumber,
  //   sahaShikshakTwoName: SahaShikshak2Name,
  //   shahShikshakTwoContactNumber: SahaShikshak2ContactNumber,
  //   status: Status,
  //   reasonForClosure: reason,
  // };

  // console.log(temp)





  const handleChangeWings  = (event) => {
    let errorData = { ...errors };
    const { name, value } = event.target;
    const errorMessage = validateProperty(event);
    if (errorMessage) {
      errorData[name] = errorMessage;
    } else {
      delete errorData[name];
    }
     
     setWings(
       // On autofill we get a stringified value.
       typeof value === 'string' ? value.split(',') : value,
     );
     let customerData = { ...formValue };
    customerData[name] = typeof value === 'string' ? value.split(',') : value;
 
    setFormValue(customerData); 
    setErrors(errorData);
   };


  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCityName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const names = [
    'NYC',
    'IYC',
    'General',
    ' Only Professionals',
    'Yoga Therapy',
    ' Only Children',
    'Only Ladies',
    'Only Senior Citizens',
    'Youth Male',
    'Youth Female',
  ];
  const update = async (temp) => {
    // const res = await postRequest("/addBranchApi/", temp);
    // console.log(res);
    setSnack({ open: true, vertical: 'top',
      horizontal: 'right', });
      setTimeout(
        ()=>{
         handleClose();
          }
        ,4000
      )
    
    
    // await res.message === "created" ? setOpenSnackbar(true) : setOpenSnackbar(false)
    // setSnackbar("valaya created successfully")
  };
  useEffect(() => {
    console.log()
    if (id !== "") {
      const {
        name: {
          props: { name: uservalayaName },
        },
        District: {
          props: { children: valayaDistrictsvalayaName },
        },
        Description: {
          props: { children },
        },
      } = row;
      setValayaName(uservalayaName);
      setValayaDistricts(valayaDistrictsvalayaName);
      setValayaDescription(children);
    }
  }, [id]);
  useEffect(async () => {
    if (formValue.dropdownCountry) {
     
      const st = await getRequest(`/getStateListApi/${formValueAll.dropdownCountry.uuid}`);
      console.log("states", st);
      setState(st.response);
    }
    else {
      const con = await getRequest("/getCountryListApi/");
      console.log("country", con.response);
      setCountry(con.response);
      console.log(con.response)
    }
  }, [formValue.dropdownCountry]);
  useEffect(async () => {
    const ci = await getRequest(`/getValayaByStateApi/${formValueAll.dropdownState.uuid}`);
    console.log(ci)
    console.log(ci.response)
    setValaya(ci.response);
  }, [formValue.dropdownState])
  useEffect(async () => {
    const ci = await getRequest(`/getCityListByValayaApi/${formValueAll.dropdowanValaya.uuid}`);
    console.log(ci)
    console.log(ci.response)
    setDistrict(ci.response)

  }, [formValue.dropdowanValaya])

  useEffect(async () => {
    const ci = await getRequest(`/getUpaValayaByCityApi/${formValueAll.dropdowncity.uuid}`);
    console.log(ci)
    console.log(ci.response)
    setUpavalya(ci.response)

  }, [formValue.dropdowncity])

  const closeModal = () => {
    handleClose()
  }

  // useEffect(async()=>{
  // const st = await getRequest("/getValayaByStateApi/").then(res=>{
  //         console.log("upaValaya", res.data);
  //         // setCountry(res.data.response.valayas);
  //     // setCity(st.response);
  //   });
  // })
  console.log("country ", country, "state", state, "city=>",);
  const snackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnack({ open: false, ...snack });
  };
  return (
    <>
    <Snackbar anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}  open={open}  autoHideDuration={4000} onClose={handleClose}
     
    >
    <Alert anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal} onClose={snackClose} severity="success" sx={{ width: '100%' }}>
     Batch Added Successfully✔
    </Alert>
  </Snackbar>
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
              <Typography sx={{ display: "flex", justifyContent: "space-between" }} >
                <MDTypography variant="h6" color="white">
                  Batch
                </MDTypography >
                <Typography>
                  <CloseIcon sx={{ cursor: "pointer" }} onClick={() => closeModal()} />
                </Typography>
              </Typography>
            </MDBox>
            <MDBox pt={3}>
              <Card sx={{ overflowY: "scroll", height: "30rem" }}>
                <MDBox pt={4} pb={3} px={3}>
                  <MDBox component="form" role="form">
                    <Grid container spacing={2}>
                      <Grid item lg={12} xs={12} mb={2} md={12}>
                        <TextField
                          type="text"
                          label="Batch Name"
                          value={formValue.BranchName}
                          name="BranchName"
                          onChange={handleSave}
                          error={!!errors.BranchName}
                          
                          onBlur={handleSave}
                          variant="standard"
                          fullWidth
                        />
                        {errors.BranchName && (
                          <div className="text-danger">
                         <p style={{fontSize:"1rem"}}>Required</p> 
                        </div>
                        )}
                      </Grid>
                      <Grid item lg={6} xs={12} mb={2} md={12}>
                       
                      <FormControl sx={{ m: 1, minWidth: 80 }}>
                      <InputLabel id="dropdownCountry">Select Country</InputLabel>
                      <Select
                        labelId="dropdownCountry"
                        id="dropdownCountry"
                        value={formValueAll.dropdownCountry}
                        
                      
                        onChange={(e)=>handleCountry(e)}
                        
                        name="dropdownCountry"
                        
                        error={!!errors.dropdownCountry}
                        autoWidth
                      
                        
                        className="border-danger"
                        input={<OutlinedInput label="Select Country" />}
                      >
                     
                        {country.map((list, index) => {
                          return (
                            <MenuItem value={list} key={index}>
                              
                              {list.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {errors.dropdownCountry && (
                        <div className="text-danger">
                         <p style={{fontSize:"1rem"}}>Required</p> 
                        </div>
                      )}
                    </FormControl>
                        
                      </Grid>
                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                          <InputLabel id="demo-simple-select-autowidth-label">Select State</InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={formValueAll.dropdownState}
                            name="dropdownState"
                            onChange={(e)=>handleCountry(e)}
                            error={!!errors.dropdownState}
                            autoWidth
                            label="data"
                            input={<OutlinedInput label="Select State" />}

                          >
                            {state.map((list, index) => 
                          
                                <MenuItem value={list} key={index}>
                                  {list.name}
                                </MenuItem>
                              
                            )}
                          </Select>
                          {errors.dropdownState && (
                            <div className="text-danger">
                         <p style={{fontSize:"1rem"}}>Required</p> 
                        </div>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                          <InputLabel id="demo-simple-select-autowidth-label">Select Valaya</InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={formValueAll.dropdowanValaya}
                            name="dropdowanValaya"
                            onChange={(e) =>handleValaya(e)}
                            error={!!errors.dropdowanValaya}
                            autoWidth
                            label="data"
                            input={<OutlinedInput label="Select Valaya" />}

                          >
                            {valaya.map((list, index) => {
                              return (
                                <MenuItem value={list} key={index}>
                                  {list.valayaName}
                                </MenuItem>
                              );
                            })}
                          </Select>
                          {errors.dropdowanValaya && (
                            <div className="text-danger">
                         <p style={{fontSize:"1rem"}}>Required</p> 
                        </div>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                          <InputLabel id="demo-simple-select-autowidth-label">Select District</InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={formValueAll.dropdowncity}
                            name="dropdowncity"
                            onChange={(e) =>handleCountry(e)}
                            error={!!errors.dropdowncity}
                            autoWidth
                            label="data"
                            input={<OutlinedInput label="Select District" />}

                          >
                            {district.map((list, index) => {
                              return (
                                <MenuItem value={list} key={index}>
                                  {list.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                          {errors.dropdowncity && (
                            <div className="text-danger">
                         <p style={{fontSize:"1rem"}}>Required</p> 
                        </div>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                          <InputLabel id="demo-simple-select-autowidth-label">Select UPA Valaya</InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={formValueAll.UPAvalayaNamecity}
                            name="UPAvalayaNamecity"
                            onChange={(e) =>handleUpvalaya(e)}
                            error={!!errors.UPAvalayaNamecity}
                            autoWidth
                            label="data"
                            input={<OutlinedInput label="Select UPA Valaya" />}

                          >
                            {upavalaya.map((list, index) => {
                              return (
                                <MenuItem value={list} key={index}>
                                  {list.upaValayaName}
                                </MenuItem>
                              );
                            })}
                          </Select>
                          {errors.UPAvalayaNamecity && (
                            <div className="text-danger">
                         <p style={{fontSize:"1rem"}}>Required</p> 
                        </div>
                          )}
                        </FormControl>
                      </Grid>
                      {/* <Grid item lg={6} xs={12} mb={2} md={12}>
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                          <InputLabel id="demo-simple-select-autowidth-label">Areas</InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={cityName}
                            onChange={(e) => setDropdownState(e.target.value)}
                            autoWidth
                            label="data"
                          >
                            {state.map((list, index) => {
                              return (
                                <MenuItem value={list.name} key={index}>
                                  {list.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid> */}

                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        {/* <FormControl sx={{ m: 1, minWidth: 80 }}>
                          <InputLabel id="demo-simple-select-autowidth-label">
                           Areas
                          </InputLabel>
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
                                <MenuItem value={list.name} key={index}>
                                  {list.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl> */}

                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                          <InputLabel id="demo-simple-select-autowidth-label">Select Batch Type</InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={formValue.type}
                            name="type"
                            onChange={(e) =>handleSave(e)}
                            error={!!errors.type}
                            autoWidth
                            label="Age"
                            input={<OutlinedInput label='Select Batch Type' />}
                          >

                            <MenuItem value="online" onClick={() => setOfflineBtn(false)}>Online</MenuItem>
                            <MenuItem value="offline" onClick={() => setOfflineBtn(true)} >Offline</MenuItem>
                          </Select>
                          {errors.type && (
                            <div className="text-danger">
                         <p style={{fontSize:"1rem"}}>Required</p> 
                        </div>
                          )}
                        </FormControl>
                      </Grid>

                      {(offlineBtn == true) ? <Grid item lg={6} xs={12} mb={2} md={12}>

                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                          <InputLabel id="demo-simple-select-autowidth-label"> Select Branch</InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={formValue.batchtype}
                            name="batchtype"
                            onChange={(e) =>handleSave(e)}
                            error={!!errors.batchtype}
                            autoWidth
                            label="Age"
                            input={<OutlinedInput label=' Select Branch' />}
                          >
                            <MenuItem value="Yoga Nidra">Yoga Nidra </MenuItem>
                            <MenuItem value="Core Blast">Core Blast  </MenuItem>
                            <MenuItem value="Yoga for PCOD">Yoga for PCOD </MenuItem>
                            <MenuItem value="Yoga Nidra YOGA FOR SCIATICA PAIN">Yoga Nidra YOGA FOR SCIATICA PAIN </MenuItem>

                          </Select>
                          {errors.batchtype && (
                            <div className="text-danger">
                         <p style={{fontSize:"1rem"}}>Required</p> 
                        </div>
                          )}
                        </FormControl>
                      </Grid> : ''}


                      <Grid item lg={6} xs={12} mb={2} md={12}>

                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                          <InputLabel id="demo-simple-select-autowidth-label">Select Batch Categoty </InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={formValue.BatchCategory}
                            name="BatchCategory"
                            onChange={(e) =>handleSave(e)}
                            error={!!errors.BatchCategory}
                            autoWidth
                            label="Age"
                            input={<OutlinedInput label='Select Batch Categoty ' />}
                          >

                            <MenuItem value="Morning (Batch starts : 4AM - 10AM)">Morning (Batch starts : 4AM - 10AM)</MenuItem>
                            <MenuItem value="Afternoon (Batch starts : 11AM - 3PM)">Afternoon (Batch starts : 11AM - 3PM) </MenuItem>
                            <MenuItem value="Evening (Batch starts : 4PM & above)">Evening (Batch starts : 4PM & above) </MenuItem>
                          </Select>
                          {errors.BatchCategory && (
                            <div className="text-danger">
                         <p style={{fontSize:"1rem"}}>Required</p> 
                        </div>
                          )}
                        </FormControl>
                      </Grid>



                      <Grid item lg={6} xs={12} mb={2} md={12}>

                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                          <InputLabel id="demo-simple-select-autowidth-label">Select TimeZone  </InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={formValue.TimeZone}
                            name="TimeZone"
                            onChange={(e) =>handleSave(e)}
                            error={!!errors.TimeZone}
                            autoWidth
                            label="Age"
                            input={<OutlinedInput label='Select TimeZone  ' />}
                          >

                            <MenuItem value="Australian Central Western Standard Time UTC +8:45">Australian Central Western Standard Time UTC +8:45</MenuItem>
                            <MenuItem value="Nepal Time \UTC +5:45">Nepal Time \UTC +5:45 </MenuItem>
                            <MenuItem value="Indian Standard Time 	UTC +5:30">	Indian Standard Time 	UTC +5:30</MenuItem>
                          </Select>
                          {errors.TimeZone && (
                            <div className="text-danger">
                         <p style={{fontSize:"1rem"}}>Required</p> 
                        </div>
                          )}
                        </FormControl>
                      </Grid>



                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <TextField sx={{ m: 1, minWidth: 80 }} label="Batch Start Date"
                        value={formValue.BatchStartDate}
                            name="BatchStartDate"
                            onChange={(e) =>handleSave(e)}
                            error={!!errors.BatchStartDate}
                         InputLabelProps={{ shrink: true, }} id="Batch_Start_Date " type="Date" />
                         {errors.BatchStartDate && (
                          <div className="text-danger">
                         <p style={{fontSize:"1rem"}}>Required</p> 
                        </div>
                        )}
                      </Grid>
                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <TextField sx={{ m: 1, minWidth: 80 }} label="Batch Start Time"value={formValue.BatchStartTime}
                        name="BatchStartTime"
                        onChange={(e) =>handleSave(e)} InputLabelProps={{ shrink: true, }} 
                        error={!!errors.BatchStartTime}
                        id="BatchstartTime" type="time" />
                        {errors.BatchStartTime && (
                          <div className="text-danger">
                         <p style={{fontSize:"1rem"}}>Required</p> 
                        </div>
                        )}
                      </Grid>

                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <TextField sx={{ m: 1, minWidth: 80 }} label="Batch End Time" value={formValue.BatchEndTime}
                        name="BatchEndTime"
                        onChange={(e) =>handleSave(e)} InputLabelProps={{ shrink: true, }} 
                        error={!!errors.BatchEndTime}
                        id="BatchEndTime" type="time" />
                        {errors.BatchEndTime && (
                          <div className="text-danger">
                         <p style={{fontSize:"1rem"}}>Required</p> 
                        </div>
                        )}
                      </Grid>













                      <Grid item lg={6} xs={12} mb={2} md={12}>
                      <TextField sx={{ m: 1, minWidth: 80 }} label="Mukya Shikshak Name  " 
                      name="mukyaShikshakName"
                      value={formValue.mukyaShikshakName}
                      onChange={(e) => handleSave(e)}
                      error={!!errors.mukyaShikshakName}
                      InputLabelProps={{ shrink: true, }}
                       id="mukyaShikshakName  " type="text" />
                      {errors.mukyaShikshakName && (
                        <div className="text-danger">
                         <p style={{fontSize:"1rem"}}>Required</p> 
                        </div>
                      )}
                    </Grid>
                    <Grid item lg={6} xs={12} mb={2} md={12}>
                        <TextField sx={{ m: 1, minWidth: 80 }} label="Mukya Shikshak Email   " 
                        name="mukyaShikshakEmail"
                     
                        value={formValue.mukyaShikshakEmail}
                        onChange={(e) => handleSave(e)} id="mukyaShikshakEmail  "
                        error={!!errors.mukyaShikshakEmail}
                        InputLabelProps={{ shrink: true, }}
                        type="email" />
                        {errors.mukyaShikshakEmail && (
                          <div className="text-danger">
                         <p style={{fontSize:"1rem"}}>Required</p> 
                        </div>
                        )}
                      </Grid>

                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <TextField sx={{ m: 1, minWidth: 80 }} label="Mukya Shikshak Contact Number    " name="mukyaShikshakContactNumber"
                        value={formValue.mukyaShikshakContactNumber}
                        error={!!errors.mukyaShikshakContactNumber}
                        InputLabelProps={{ shrink: true, }}
                        onChange={(e) => handleSave(e)} id="mukyaShikshakContactNumber   " type="number" />
                        {errors.mukyaShikshakContactNumber && (
                          <div className="text-danger">
                         <p style={{fontSize:"1rem"}}>Required</p> 
                        </div>
                        )}
                      </Grid>

                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <TextField sx={{ m: 1, minWidth: 80 }} label="Saha Shikshak 1 Name" name="sahaShikshak1Name"
                        value={formValue.sahaShikshak1Name}
                        onChange={(e) => handleSave(e)}id="sahaShikshak1Name " 
                        error={!!errors.sahaShikshak1Name}
                        InputLabelProps={{ shrink: true, }}
                        type="text" />
                        {errors.sahaShikshak1Name && (
                          <div className="text-danger">
                         <p style={{fontSize:"1rem"}}>Required</p> 
                        </div>
                        )}
                      </Grid>

                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <TextField sx={{ m: 1, minWidth: 80 }} label="Saha Shikshak 1 Contact Number " name="SahaShikshak1ContactNumber"
                        value={formValue.SahaShikshak1ContactNumber}
                        onChange={(e) => handleSave(e)} 
                        error={!!errors.SahaShikshak1ContactNumber}
                        InputLabelProps={{ shrink: true, }}
                        id="sahaShikshak1ContactNumber" type="number" />
                        {errors.SahaShikshak1ContactNumber && (
                          <div className="text-danger">
                         <p style={{fontSize:"1rem"}}>Required</p> 
                        </div>
                        )}
                      </Grid>
                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <TextField sx={{ m: 1, minWidth: 80 }} label="Saha Shikshak 2 Name" name="SahaShikshak2Name"
                        value={formValue.SahaShikshak2Name}
                        error={!!errors.SahaShikshak2Name}
                        InputLabelProps={{ shrink: true, }}
                        onChange={(e) => handleSave(e)} id="sahaShikshak2Name " type="name" />
                        {errors.SahaShikshak2Name && (
                          <div className="text-danger">
                         <p style={{fontSize:"1rem"}}>Required</p> 
                        </div>
                        )}
                      </Grid>

                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <TextField sx={{ m: 1, minWidth: 80 }} label="Saha Shikshak 2 Contact Number " name="SahaShikshak2ContactNumber"
                        value={formValue.SahaShikshak2ContactNumber}
                        onChange={(e) => handleSave(e)} 
                        error={!!errors.SahaShikshak2ContactNumber}
                        InputLabelProps={{ shrink: true, }}
                        id="sahaShikshak2ContactNumber  " type="number" />
                        {errors.SahaShikshak2ContactNumber && (
                          <div className="text-danger">
                         <p style={{fontSize:"1rem"}}>Required</p> 
                        </div>
                        )}
                      </Grid>
                      <Grid item lg={6} xs={12} mb={2} md={12}>
                      <FormControl sx={{ m: 1, minWidth: 80 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">Select status</InputLabel>
                        <Select
                          labelId="demo-simple-select-autowidth-label"
                          id="demo-simple-select-autowidth"
                          value={formValue.status}
                          name="status"
                          onChange={(e) => handleSave(e)}
                          error={!!errors.status}
                          autoWidth
                          label="Age"
                          input={<OutlinedInput label="Select status" />}

                        >

                          <MenuItem value="Active">Active</MenuItem>
                          <MenuItem value="Temporarily Closed">Temporarily Closed</MenuItem>
                          <MenuItem value="Permanently Closed">Permanently Closed</MenuItem>
                        </Select>
                        {errors.status && (
                          <div className="text-danger">
                         <p style={{fontSize:"1rem"}}>Required</p> 
                        </div>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item lg={6} xs={12} mb={2} md={12}>
                    <FormControl sx={{ m: 1, minWidth: 80 }}>
                      <InputLabel id="demo-simple-select-autowidth-label">Select Reason For Closure</InputLabel>
                      <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={formValue.reason}
                        name="reason"
                        onChange={(e) => handleSave(e)}
                        error={!!errors.reason}
                        autoWidth
                        label="Age"
                        input={<OutlinedInput label="Select Reason For Closure" />}

                      >
                        <MenuItem value="">
                          {/* <em>None</em> */}
                        </MenuItem>
                        <MenuItem value="Due to unavailability of practice space anymore.">Due to unavailability of practice space anymore.</MenuItem>
                        <MenuItem value="Unavailability of Shikshaks."> Unavailability of Shikshaks.</MenuItem>
                        <MenuItem value="No shikshanarthis.">No shikshanarthis.</MenuItem>
                        <MenuItem value="Decision taken by samiti to close">Decision taken by samiti to close</MenuItem>
                        <MenuItem value="Decision taken by space owners to close."> Decision taken by space owners to close.</MenuItem>
                        <MenuItem value="Temporarily inactive/closed due to COVID.">Temporarily inactive/closed due to COVID.</MenuItem>
                        <MenuItem value="Temporarily inactive/closed due to other reasons.">Temporarily inactive/closed due to other reasons.</MenuItem>
                        <MenuItem value="Permanently closed due to other reasons.">  Permanently closed due to other reasons.</MenuItem>
                        <MenuItem value="Permanently closed after COVID due to no followup done with space owners.">Permanently closed after COVID due to no followup done with space owners.</MenuItem>
                      </Select>
                      {errors.reason && (
                        <div className="text-danger">
                         <p style={{fontSize:"1rem"}}>Required</p> 
                        </div>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item lg={6} xs={12} mb={2} md={12}>

                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-checkbox-label">Wings </InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      name="wings"
                      value={formValue.wings}
                      onChange={handleChangeWings}
                      input={<OutlinedInput label="Wings " />}
                      renderValue={(selected) => selected.join(', ')}
                      MenuProps={MenuProps}
                     error={!!errors.dropdownCountry}
                    >
                      {names.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox checked={formValue.wings.indexOf(name) > -1} />
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.wings && (
                      <div className="text-danger">
                         <p style={{fontSize:"1rem"}}>Required</p> 
                        </div>
                    )}
                    
                  </FormControl>
                </Grid>
                    </Grid>
                    <MDBox mt={4} mb={1}>
                      <MDButton
                        variant="gradient"
                        color="info"
                        fullWidth
                        onClick={() => {
                          validateForm();
                        }}
                      >
                        {!id ? "Add Upa Batch" : "Update Valaya"}
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

export default BranchInAreaForm;
