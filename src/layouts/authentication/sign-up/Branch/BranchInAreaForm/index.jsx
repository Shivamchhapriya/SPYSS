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
import axios from "axios";
import { putRequest } from "examples/apiHandler";
import { useContext } from "react";
import { authContext } from "context/TableState";
import { useFormik } from "formik";
import signupschemas from "schema";
import { style } from "@mui/system";
// import * as Yup from "yup";

// import * as Yup from "yup";











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
  const [name, setName] = useState("");
  const { branchinAreaTable, setBranchinAreaTable } = useContext(authContext);


  const [dropdownCountry, setDropdownCountry] = useState({});
  const [dropdownState, setDropdownState] = useState("");
  const [dropdowanValaya, setDropdowanValaya] = useState("");
  const [dropdowncity, setDropdowncity] = useState("");
  const [UPAvalayaNamecity, setUPAValayaNamecity] = React.useState("");
  const [NearestLandmark, setNearestLandmark] = useState("");
  const [wardnumber, setWardNumber] = useState("");
  const [BranchEmail, setBranchEmail] = useState("");
  const [ContactNumber, setContactNumber] = useState("");
  const [GoogleMapUrl, setGoogleMapUrl] = useState("");
  const [BranchStartDate, setBranchStartDate] = useState("");
  const [BranchCloseDate, setBranchCloseDate] = useState("");
  const [Address, setAddress] = useState("");
  const [pincode, setpincode] = useState("");
  const [mukyaShikshakName, setmukyaShikshakName] = useState("");
  const [mukyaShikshakEmail, setmukyaShikshakEmail] = useState("");
  const [mukyaShikshakContactNumber, setmukyaShikshakContactNumber] = useState("");
  const [sahaShikshak1Name, setSahaShikshak1Name] = useState("");
  const [SahaShikshak1ContactNumber, setSahaShikshak1ContactNumber] = useState("");
  const [SahaShikshak2Name, setSahaShikshak2Name] = useState("");
  const [SahaShikshak2ContactNumber, setSahaShikshak2ContactNumber] = useState("");
  const [Status, setstatus] = React.useState('');
  const [reason, setreason] = React.useState('');



  const [country, setCountry] = React.useState([]);
  const [state, setState] = React.useState([]);
  const [valaya, setValaya] = React.useState([]);
  const [district, setDistrict] = React.useState([]);

  const [valayaNameState, setValayaNameState] = React.useState("");
  const [upavalaya, setUpavalya] = React.useState([]);




  // const [valaya, setValaya] = React.useState([]);
  const { getData } = valayaTableData();



  console.log('essxrdctfvgybhunj', name)





  const temp = {
    countryUuid: dropdownCountry.uuid,
    stateUuid: dropdownState.uuid,
    valayaUuid: dropdowanValaya,
    cityUuid: dropdowncity,
    upaValayaUuid: UPAvalayaNamecity,
    branchName: name,
    nearestLandmark: NearestLandmark,
    wardNumber: wardnumber,
    branchEmail: BranchEmail,
    contactNumber: ContactNumber,
    googleMapUrl: GoogleMapUrl,
    branchStartDate: BranchStartDate,
    branchCloseDate: BranchCloseDate,
    address: Address,
    pincode: pincode,
    mukyaShikshakName: mukyaShikshakName,
    mukyaShikshakEmail: mukyaShikshakEmail,
    mukyaShikshakContactNumber: mukyaShikshakContactNumber,
    sahaShikshakOneName: sahaShikshak1Name,
    shahShikshakOneContactNumber: SahaShikshak1ContactNumber,
    sahaShikshakTwoName: SahaShikshak2Name,
    shahShikshakTwoContactNumber: SahaShikshak2Name,
    status: Status,
    reasonForClosure: reason,
  };
 

  console.log ("shiv temo data ::",temp)

  const update = async (temp) => {debugger
    // handleSubmit()
    console.log("sssgggggg handle ::",)
    if (id !== '') {
      var editBranchData = {
        uuid: id.uuid,
        branchName: name,
        countryUuid: dropdownCountry.uuid,
        stateUuid: dropdownState.uuid,
        valayaUuid: dropdowanValaya,
        cityUuid: dropdowncity,
        upaValayaUuid: UPAvalayaNamecity,
        nearestLandmark: NearestLandmark,
        wardNumber: wardnumber,
        branchEmail: BranchEmail,
        contactNumber: ContactNumber,
        googleMapUrl: GoogleMapUrl,
        branchStartDate: BranchStartDate,
        branchCloseDate: BranchCloseDate,
        address: Address,
        pincode: pincode,
        mukyaShikshakName: mukyaShikshakName,
        mukyaShikshakEmail: mukyaShikshakEmail,
        mukyaShikshakContactNumber: mukyaShikshakContactNumber,
        sahaShikshakOneName: sahaShikshak1Name,
        shahShikshakOneContactNumber: SahaShikshak1ContactNumber,
        sahaShikshakTwoName: SahaShikshak2Name,
        shahShikshakTwoContactNumber: SahaShikshak2ContactNumber,
        status: Status,
        reasonForClosure: reason,
      }
      console.log("temp,=>", editBranchData);
      const res = await putRequest("/editBranchApi/", editBranchData);
      console.log(res)

      await handleEditClose()
      await res.message === "created" ? setOpenSnackbar(true) : setOpenSnackbar(false)
      setBranchinAreaTable(!branchinAreaTable)
      setSnackbar("valaya created successfully")
    } else {
      if( dropdowncity && reason && SahaShikshak2Name && SahaShikshak2Name && SahaShikshak2Name && Status && mukyaShikshakName && mukyaShikshakEmail && sahaShikshak1Name  && UPAvalayaNamecity && name && NearestLandmark && wardnumber && BranchEmail  && GoogleMapUrl && BranchStartDate && Address && pincode !== "" && mukyaShikshakContactNumber.length === 10 && SahaShikshak1ContactNumber.length ===10 && ContactNumber.length===10){
        console.log("temp,=>", temp);
        const res = await postRequest("/addBranchApi/", temp);
        console.log(res)
        await handleClose();
        await res.message === "created" ? setOpenSnackbar(true) : setOpenSnackbar(false)
        setBranchinAreaTable(!branchinAreaTable)
  
        setSnackbar("valaya created successfully")
      }

      else{
        alert("error")
      }
    }
  };
  useEffect(() => {

    if (id !== "") {

      console.log(row)

      setName(row.branchName)

    }
  }, [id]);

  // useEffect(async()=>{
  //   const con = await getRequest("/getCountryListApi/");
  //   console.log("country", con.response);
  //   // setCountry(con.response);
  //   console.log(con.response)
  // },[])

  useEffect(async () => {
    debugger
    const ci = await getRequest("/getCountryListApi/");
    console.log(ci)
    console.log(ci.response)
    setCountry(ci.response);
  }, []);


  useEffect(async () => {
    debugger
    if (dropdownCountry) {
      const st = await getRequest(`/getStateListApi/${dropdownCountry.uuid}`);
      console.log("states", st);
      setState(st.response);
    }
  }, [dropdownCountry]);

  useEffect(async () => {
    const ci = await getRequest(`/getValayaByStateApi/${dropdownState.uuid}`);
    console.log(ci)
    console.log(ci.response)
    setValaya(ci.response);
  }, [dropdownState])
  useEffect(async () => {
    const ci = await getRequest(`/getCityListByValayaApi/${dropdowanValaya}`);
    console.log(ci)
    console.log(ci.response)
    setDistrict(ci.response)

  }, [dropdowanValaya])

  useEffect(async () => {

    const ci = await getRequest(`/getUpaValayaByCityApi/${dropdowncity}`);
    console.log(ci)
    console.log("vala dddhdhdhdhdhd", ci.response)
    setUpavalya(ci.response)

  }, [dropdowncity])

  const closeModal = () => {

    if (id !== "") {
      handleEditClose()
      return
    } else {
      handleClose()

    }

  }

  // useEffect(async()=>{
  // const st = await getRequest("/getValayaByStateApi/").then(res=>{
  //         console.log("upaValaya", res.data);
  //         // setCountry(res.data.response.valayas);
  //     // setCity(st.response);
  //   });
  // })

  /* eslint-disable */







  const initialValues = {
    Name: '',
    droCountry: '',
    DropdownStat: '',
    DropValaya: '',
    dropcity: '',
    upaValayacity: '',
    NearestLandMark:'',   
    wardnumberdata:'',
    Emaildata:'',
    contactnumber:'',
    Googlemapurl:'',
    Branchstartdate:'',
    CloseDate:'',
    addressdata:'',
    PinCode:'',
    MukyaShikshakName:'',
    MukyaShikshak1Name:'',
    SahaShikshak1Name:'',
    BranchEmaildata:'',
    SahaShikshakcontactnumber:'',
    SahaShikshak1contactnumber:'',
    mukyaShikshakcontactnumber:'',
    statusData:'',
    reasonClosure:'',
    Sahashikshak2name:'',
    }

  const { values, touched, handleSubmit, handleChange, errors, } = useFormik
    ({
      initialValues: initialValues,
      validationSchema: signupschemas,
      onSubmit: (value) => {
        console.log(value)
    }

    })



  console.log("country ", country, "state", state, "city=>",);
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
              <Typography sx={{ display: "flex", justifyContent: "space-between" }} >
                <MDTypography variant="h6" color="white">
                  Branch
                </MDTypography >
                <Typography>
                  <CloseIcon sx={{ cursor: "pointer" }} onClick={() => closeModal()} />
                </Typography>
              </Typography>
            </MDBox>
            <MDBox pt={3}>
              <Card sx={{ overflowY: "scroll", height: "30rem" }}>
                <MDBox pt={4} pb={3} px={3} >
                  <MDBox component="form" onSubmit={handleSubmit} role="form">
                    <Grid container spacing={2}>
                      <Grid item lg={12} xs={12} mb={2} md={12}>
                        <MDInput
                          type="text"
                          label="Branch Name"
                          className='inputboxs'
                          onChangeCapture={e => { setName(e.target.value); }}
                          onChange={handleChange}
                          //  
                          variant="standard"
                          name="Name"
                          fullWidth
                          error={errors.Name && touched.Name ? true :false}
                          />

                          {console.log("ddddddddddddddddddddddddddddddddddddddd",errors.Name,errors.droCountry,errors.DropdownStat)}
                        {errors.Name && touched.Name ? (<p style={{ color: "#F44335",fontSize: "0.75rem", marginLeft: "1rem",fontStyle: "none",}}  className="text-red">{errors.Name}</p>) : null}
                      </Grid>
                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                          <InputLabel id="demo-simple-select-autowidth-label">Select Country</InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            // value={(e) => setDropdownCountry(e.target.value)}

                            onChange={handleChange}

                            onBlur={(e) => { e.target.value === undefined ? "" : setDropdownCountry(e.target.value) }}



                            name="droCountry"
                            autoWidth

                            label="data"
                            input={<OutlinedInput label="Select Country" />}
                            // error={!!errors.droCountry}
                            error={errors.droCountry &&  touched.droCountry ? true :false}


                          >
                            {country.map((list) => (

                              <MenuItem value={list} >

                                {list.name}
                              </MenuItem>
                            )
                            )}
                          </Select>
                          {errors.droCountry && touched.droCountry ? (<p style={{ color: "#F44335",fontSize: "0.75rem", marginLeft: "1rem",fontStyle: "none",}}  className="text-red">{errors.droCountry}</p>) : null}

                        </FormControl>
                      </Grid>
                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                          <InputLabel id="demo-simple-select-autowidth-label">Select State</InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            // value={dropdownState}
                            onChange={handleChange}
                            onBlur={(e) => { e.target.value === undefined ? "" : setDropdownState(e.target.value) }}
                            autoWidth
                            label="data"
                            name="DropdownStat"
                            input={<OutlinedInput label="Select State" />}
                            // error={!!errors.DropdownStat}
                            error={errors.DropdownStat && touched.DropdownStat  ? true :false}

                          >
                            {state.map((list, index) => {
                              return (
                                <MenuItem value={list} key={index}>
                                  {list.name}
                                </MenuItem>
                              );
                            })}

                          </Select>
                          {errors.DropdownStat && touched.DropdownStat ? (<p style={{ color: "#F44335",fontSize: "0.75rem", marginLeft: "1rem",fontStyle: "none",}}  className="text-red">{errors.DropdownStat}</p>) : null}
                        </FormControl>
                      </Grid>
                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                          <InputLabel id="demo-simple-select-autowidth-label">Select Valaya</InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            // value={dropdowanValaya}
                            onChange={handleChange}

                            onBlur={(e) => { e.target.value === undefined ? "" : setDropdowanValaya(e.target.value) }}
                            autoWidth
                            label="data"
                            input={<OutlinedInput label="Select District" />}
                            name="DropValaya"
                            // error={!!errors.DropValaya}
                            error={errors.DropValaya && touched.DropValaya  ? true :false}


                          >
                            {valaya.map((list, index) => {
                              return (
                                <MenuItem value={list.uuid} key={index}>
                                  {list.valayaName}
                                </MenuItem>
                              );
                            })}
                          </Select>
                          {errors.DropValaya && touched.DropValaya ? (<p style={{ color: "#F44335",fontSize: "0.75rem", marginLeft: "1rem",fontStyle: "none",}}  className="text-red">{errors.DropValaya}</p>) : null}

                        </FormControl>
                      </Grid>
                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                          <InputLabel id="demo-simple-select-autowidth-label">Select District</InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            // value={dropdowncity}
                            onBlur={(e) => { e.target.value === undefined ? "" : setDropdowncity(e.target.value) }}
                            onChange={handleChange}
                            autoWidth
                            label="data"
                            input={<OutlinedInput label="Select District" />}
                            name='dropcity'
                            error={errors.dropcity && touched.dropcity  ? true :false}
                            

                          >
                            {district.map((list, index) => {
                              return (
                                <MenuItem value={list.uuid} key={index}>
                                  {list.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                          {errors.dropcity && touched.dropcity ? (<p style={{ color: "#F44335",fontSize: "0.75rem", marginLeft: "1rem",fontStyle: "none",}}  className="text-red">{errors.dropcity}</p>) : null}

                        </FormControl>
                      </Grid>
                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                          <InputLabel id="demo-simple-select-autowidth-label">Select UPA Valaya</InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            onChange={handleChange}
                            onBlur={(e) => { e.target.value === undefined ? '' : setUPAValayaNamecity(e.target.value) }}
                            autoWidth
                            label="data"
                            name="upaValayacity"
                            input={<OutlinedInput label="Select UPA Valaya" />}
                            error={errors.upaValayacity && touched.upaValayacity  ? true :false}



                          >
                            {upavalaya.map((list, index) => {
                              return (
                                <MenuItem value={list.uuid} key={index}>
                                  {list.upaValayaName}
                                </MenuItem>
                              );
                            })}
                          </Select>
                          {errors.upaValayacity && touched.upaValayacity ? (<p style={{ color: "#F44335",fontSize: "0.75rem", marginLeft: "1rem",fontStyle: "none",}}  className="text-red">{errors.upaValayacity}</p>) : null}

                        </FormControl>
                      </Grid>

                      

                      <Grid item lg={6} xs={12} mb={2} md={12} >
                        <MDInput sx={{ m: 1, minWidth: 80 }}label="Nearest Landmark" 
                        onChangeCapture={e => { setNearestLandmark(e.target.value) }}
                        onChange={handleChange}
                        //   
                        error={errors.NearestLandMark && touched.NearestLandMark  ? true :false}



                        name="NearestLandMark"  type="text" />
                        {errors.NearestLandMark && touched.NearestLandMark ? (<p  style={{ color: "#F44335",fontSize: "0.75rem", marginLeft: "1rem",fontStyle: "none",}} className="text-red">{errors.NearestLandMark}</p>) : null}
                      
                      </Grid>

                      <Grid item lg={6} xs={12} mb={2} md={12} >
                       
                        <MDInput sx={{ m: 1, minWidth: 80 }}   
                         label=" Ward Number "
                         onChangeCapture={e => {setWardNumber(e.target.value)}} 
                         onChange={handleChange} 
                        //    
                        error={errors.wardnumberdata && touched.wardnumberdata  ? true :false}

                          name="wardnumberdata" type="number" />
                        {errors.wardnumberdata && touched.wardnumberdata ? (<p  style={{ color: "#F44335",fontSize: "0.75rem", marginLeft: "1rem",fontStyle: "none"}} className="text-red">{errors.wardnumberdata}</p>) : null}
                     
                      </Grid>



                      <Grid item lg={6} xs={12} mb={2} md={12} >
                        <MDInput sx={{ m: 1, minWidth: 80 }}  error={errors.BranchEmaildata && touched.BranchEmaildata  ? true :false} label="Branch Email " onChangeCapture={(e) => setBranchEmail(e.target.value)} onChange={handleChange}  name="BranchEmaildata" type="email" />
                        {errors.BranchEmaildata && touched.BranchEmaildata ? (<p  style={{ color: "#F44335",fontSize: "0.75rem", marginLeft: "1rem",fontStyle: "none",}} className="text-red">{errors.BranchEmaildata}</p>) : null}

                      </Grid>

                      <Grid item lg={6} xs={12} mb={2} md={12} >
                        <MDInput sx={{ m: 1, minWidth: 80 }} label="Contact Number "                          error={errors.contactnumber && touched.contactnumber  ? true :false}
 onChangeCapture={(e) => setContactNumber(e.target.value)} onChange={handleChange}  name="contactnumber" type="number" />
                        {errors.contactnumber && touched.contactnumber ? (<p  style={{ color: "#F44335",fontSize: "0.75rem", marginLeft: "1rem",fontStyle: "none",}} className="text-red">{errors.contactnumber}</p>) : null}

                      </Grid>

                      <Grid item lg={6} xs={12} mb={2} md={12} >
                        <MDInput sx={{ m: 1, minWidth: 80 }} label="Google Map Url "                         error={errors.Googlemapurl && touched.Googlemapurl  ? true :false}
 onChangeCapture={(e) => setGoogleMapUrl(e.target.value)} onChange={handleChange} name="Googlemapurl" type="url" />
                        {errors.Googlemapurl && touched.Googlemapurl ? (<p  style={{ color: "#F44335",fontSize: "0.75rem", marginLeft: "1rem",fontStyle: "none",}} className="text-red">{errors.Googlemapurl}</p>) : null}
                      
                      </Grid>

                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <MDInput sx={{ m: 1, minWidth: 80 }} label="Branch Start Date "                         error={errors.Branchstartdate && touched.Branchstartdate  ? true :false}
 onChangeCapture={(e) => setBranchStartDate(e.target.value)} onChange={handleChange}  InputLabelProps={{ shrink: true, }} name="Branchstartdate" type="Date" />
                        {errors.Branchstartdate && touched.Branchstartdate ? (<p  style={{ color: "#F44335",fontSize: "0.75rem", marginLeft: "1rem",fontStyle: "none",}} className="text-red">{errors.Branchstartdate}</p>) : null}
                     
                      </Grid>

                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <MDInput sx={{ m: 1, minWidth: 80 }} label="Branch Closed Date "  error={errors.CloseDate && touched.CloseDate  ? true :false} onChangeCapture={(e) => setBranchCloseDate(e.target.value)} onChange={handleChange}   InputLabelProps={{ shrink: true, }} name="CloseDate" type="Date" />
                        {errors.CloseDate && touched.CloseDate ? (<p  style={{ color: "#F44335",fontSize: "0.75rem", marginLeft: "1rem",fontStyle: "none",}} className="text-red">{errors.CloseDate}</p>) : null}
                      
                      </Grid>

                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <MDInput sx={{ m: 1, minWidth: 80 }} label="Address"  error={errors.addressdata && touched.addressdata  ? true :false} onChangeCapture={(e) => setAddress(e.target.value)} onChange={handleChange}   name="addressdata" type="address" />
                        {errors.addressdata && touched.addressdata ? (<p  style={{ color: "#F44335",fontSize: "0.75rem", marginLeft: "1rem",fontStyle: "none",}} className="text-red">{errors.addressdata}</p>) : null}
                     
                      </Grid>

                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <MDInput sx={{ m: 1, minWidth: 80 }} label="Pincode "  error={errors.PinCode && touched.PinCode  ? true :false} onChangeCapture={(e) => setpincode(e.target.value)} name="PinCode" onChange={handleChange}   type="number" />
                        {errors.PinCode && touched.PinCode ? (<p  style={{ color: "#F44335",fontSize: "0.75rem", marginLeft: "1rem",fontStyle: "none",}} className="text-red">{errors.PinCode}</p>) : null}
                     
                      </Grid>

                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <MDInput sx={{ m: 1, minWidth: 80 }} label="Mukya Shikshak Name  "  error={errors.MukyaShikshakName && touched.MukyaShikshakName  ? true :false} onChangeCapture={(e) => setmukyaShikshakName(e.target.value)} onChange={handleChange}   name="MukyaShikshakName" type="text" />
                        {errors.MukyaShikshakName && touched.MukyaShikshakName ? (<p  style={{ color: "#F44335",fontSize: "0.75rem", marginLeft: "1rem",fontStyle: "none",}} className="text-red">{errors.MukyaShikshakName}</p>) : null}
                     
                      </Grid>

                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <MDInput sx={{ m: 1, minWidth: 80 }} label="Mukya Shikshak Email   "  error={errors.Emaildata && touched.Emaildata  ? true :false} onChangeCapture={(e) => setmukyaShikshakEmail(e.target.value)} onChange={handleChange}   name="Emaildata" type="email" />
                        {errors.Emaildata && touched.Emaildata ? (<p  style={{ color: "#F44335",fontSize: "0.75rem", marginLeft: "1rem",fontStyle: "none",}} className="text-red">{errors.Emaildata}</p>) : null}
                     
                      </Grid>

                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <MDInput sx={{ m: 1, minWidth: 80 }} label="Mukya Shikshak Contact Number    "  error={errors.mukyaShikshakcontactnumber && touched.mukyaShikshakcontactnumber0  ? true :false} onChangeCapture={(e) => setmukyaShikshakContactNumber(e.target.value)} onChange={handleChange}   name="mukyaShikshakcontactnumber" type="number" />
                        {errors.mukyaShikshakcontactnumber && touched.mukyaShikshakcontactnumber ? (<p  style={{ color: "#F44335",fontSize: "0.75rem", marginLeft: "1rem",fontStyle: "none",}} className="text-red">{errors.mukyaShikshakcontactnumber}</p>) : null}
                     
                      </Grid>

                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <MDInput sx={{ m: 1, minWidth: 80 }} label="Saha Shikshak 1 Name"   error={errors.SahaShikshak1Name && touched.SahaShikshak1Name  ? true :false} onChangeCapture={(e) => setSahaShikshak1Name(e.target.value)}  onChange={handleChange}   name="SahaShikshak1Name" type="text" />
                        {errors.SahaShikshak1Name && touched.SahaShikshak1Name ? (<p  style={{ color: "#F44335",fontSize: "0.75rem", marginLeft: "1rem",fontStyle: "none",}} className="text-red">{errors.SahaShikshak1Name}</p>) : null}
                      
                      </Grid>

                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <MDInput sx={{ m: 1, minWidth: 80 }} label="Saha Shikshak 1 Contact Number " error={errors.SahaShikshak1contactnumber && touched.SahaShikshak1contactnumber  ? true :false}onChangeCapture={(e) => setSahaShikshak1ContactNumber(e.target.value)} onChange={handleChange}   name="SahaShikshak1contactnumber" type="number" />
                        {errors.SahaShikshak1contactnumber && touched.SahaShikshak1contactnumber ? (<p  style={{ color: "#F44335",fontSize: "0.75rem", marginLeft: "1rem",fontStyle: "none",}} className="text-red">{errors.SahaShikshak1contactnumber}</p>) : null}

                      </Grid>

                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <MDInput sx={{ m: 1, minWidth: 80 }} label="Saha Shikshak 2 Name"  error={errors.Sahashikshak2name && touched.Sahashikshak2name  ? true :false} onChangeCapture={(e) => setSahaShikshak2Name(e.target.value)} onChange={handleChange}   name="Sahashikshak2name" type="name" />
                        {errors.Sahashikshak2name && touched.Sahashikshak2name ? (<p  style={{ color: "#F44335",fontSize: "0.75rem", marginLeft: "1rem",fontStyle: "none",}} className="text-red">{errors.Sahashikshak2name}</p>) : null}

                      </Grid>

                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <MDInput sx={{ m: 1, minWidth: 80 }} label="Saha Shikshak 2 Contact Number " error={errors.SahaShikshakcontactnumber && touched.SahaShikshakcontactnumber  ? true :false} onChangeCapture={(e) => setSahaShikshak2ContactNumber(e.target.value)} onChange={handleChange}   name="SahaShikshakcontactnumber" type="number" />
                        {errors.SahaShikshakcontactnumber && touched.SahaShikshakcontactnumber ? (<p  style={{ color: "#F44335",fontSize: "0.75rem", marginLeft: "1rem",fontStyle: "none",}} className="text-red">{errors.SahaShikshakcontactnumber}</p>) : null}
                     
                      </Grid>

                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                          <InputLabel id="demo-simple-select-autowidth-label">Select status</InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            // value={Status}
                            // onChangeCapture={handleChangeStatus}
                            onBlur={(e) => { e.target.value === undefined ? '' : setstatus(e.target.value) }}

                            autoWidth
                            label="Age"
                            input={<OutlinedInput label="Select status" />}
                             
                            onChange={handleChange}
                            name="statusData"
                            error={errors.statusData && touched.statusData  ? true :false}
                          >

                            <MenuItem value={"active".toUpperCase()}>Active</MenuItem>
                            <MenuItem value={"Temporarily Closed".toUpperCase()}>Temporarily Closed</MenuItem>
                            <MenuItem value={"Permanently Closed".toUpperCase()}>Permanently Closed</MenuItem>
                          </Select>
                        {errors.statusData && touched.statusData ? (<p  style={{ color: "#F44335",fontSize: "0.75rem", marginLeft: "1rem",fontStyle: "none",}} className="text-red">{errors.statusData}</p>) : null}

                        </FormControl>
                      </Grid>


                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                          <InputLabel id="demo-simple-select-autowidth-label">Select Reason For Closure</InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            // value={reason}
                            onBlur={(e) => { e.target.value === undefined ? "" : setreason(e.target.value) }}
                             
                            autoWidth
                            label="Age"
                            input={<OutlinedInput label="Select Reason For Closure" />}
                            name="reasonClosure"
                            onChange={handleChange}
                            error={errors.reasonClosure && touched.reasonClosure  ? true :false}

                          >

                            <MenuItem value={"Due to unavailability of practice space anymore.".toUpperCase()}>Due to unavailability of practice space anymore.</MenuItem>
                            <MenuItem value={" Unavailability of Shikshaks." .toUpperCase()}> Unavailability of Shikshaks.</MenuItem>
                            <MenuItem value={'No shikshanarthis.'.toUpperCase()}>No shikshanarthis.</MenuItem>
                            <MenuItem value={"Decision taken by samiti to close".toUpperCase()}>Decision taken by samiti to close</MenuItem>
                            <MenuItem value={" Decision taken by space owners to close.".toUpperCase()}> Decision taken by space owners to close.</MenuItem>
                            <MenuItem value={"Temporarily inactive/closed due to COVID".toUpperCase()}>Temporarily inactive/closed due to COVID.</MenuItem>
                            <MenuItem value={"Temporarily inactive/closed due to other reasons.".toUpperCase()}>Temporarily inactive/closed due to other reasons.</MenuItem>
                            <MenuItem value={"Permanently closed due to other reasons.".toUpperCase()}>  Permanently closed due to other reasons.</MenuItem>
                            <MenuItem value={"Permanently closed after COVID due to no followup done with space owners.".toUpperCase()}>Permanently closed after COVID due to no followup done with space owners.</MenuItem>
                          </Select>
                         {errors.reasonClosure && touched.reasonClosure ? (<p  style={{ color: "#F44335",fontSize: "0.75rem", marginLeft: "1rem",fontStyle: "none",}} className="text-red">{errors.reasonClosure}</p>) : null}

                        </FormControl>
                      </Grid>




                    </Grid>
                    <MDBox mt={4} mb={1}>
                      <MDButton
                        variant="gradient"
                        color="info"
                        fullWidth
                        type='submit'
                        onClick={() => {
                          update(temp);
                        }}
                      >
                        {!id ? "Add Upa brance" : "Update Valaya"}
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

export default BranchInAreaForm;
