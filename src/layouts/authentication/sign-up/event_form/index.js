import Card from "@mui/material/Card";
/* eslint-disable */

// import Checkbox from "@mui/material/Checkbox";
import React, { useEffect, useState } from "react";
// Material Dashboard 2 React components

import CloseIcon from "@mui/icons-material/Close";
import * as yup from "yup";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  TextField,
  Button,
  OutlinedInput,
} from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import SendIcon from '@mui/icons-material/Send';
const schema = yup.object().shape({
  // images: yup.string().required('A file is required'),
  images: yup.mixed().test("file", "please upload file", (value) => {
    if (value.length > 0) {
      return true;
    }
    return false;
  }),

  committeMode: yup.string().required("Please select Event"),
  country: yup.object({}).required("please select"),
  state: yup.object({}).required(),
  valaya: yup.object({}).required(),
  district: yup.object({}).required(),
  locality: yup.object({}).required(),
  otherLocalitty: yup.string().required(),

  committeLevel: yup.string().required(),
  eventStatus: yup.string().required(),
  tit: yup.string().required(),
  title: yup.string().min(2).required(),
  startDate: yup.date().min("01-01-1940").max("01-01-2023").required(),
  endDate: yup.date().min("01-01-1940").max("01-01-2023").required(),
  // date: yup.date().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  pinCode: yup.number().required(),
  shortDescription: yup.string().max(20).required(),
  fullDiscription: yup.string().required(),
  hashTag: yup.string().required(),
  startTime: yup.string().required(),
  endTime: yup.string().required(),
  audience: yup.string().required(),
  agenda: yup.string().required(),
  primaryNumber: yup.number().required(),
  secondaryNumber: yup.number().required(),
  insturctions: yup.string().required(),
  criteria: yup.string().required(),
  sanchalakName: yup.string().required(),
  sevaParmukhName: yup.string().required(),
  treasurer: yup.string().required(),
  timeStamp: yup.string().required(),
});

function EventForm({ name = "", handleClose }) {
  const [otherLocalitty, setOtherLocalitty] = useState(false);
  const [eventForm, setEventForm] = useState({
    images: "",
    startDate: "",
    endDate: "",
    title: "",
    committeMode: "",
    committeLevel: "",
    country: "",
    state: "",
    valaya: "",
    district: "",
    locality: "",
    otherLocalitty: "",
    pinCode: "",
    eventStatus: "",
    shortDescription: "",
    fullDiscription: "",
    hashTag: "",
    startTime: "",
    endTime: "",
    audience: "",
    agenda: "",
    primaryNumber: "",
    secondaryNumber: "",
    insturctions: "",
    criteria: "",
    sanchalakName: "",
    sevaParmukhName: "",
    treasurer: "",
    timeStamp: "",
  });

  const [countryUUID, setCountryUUID] = useState("");
  const [stateUUID, setStateUUID] = useState("");
  const [valayaUUID, setValayaUUID] = useState("");
  const [citiesUUID, setCitiesUUID] = useState("");

  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [valaya, setValaya] = useState([]);
  const [cities, setCities] = useState([]);
  const [locality, setLocality] = useState([]);
  const [more, setMore] = useState(false);

  let getValaya;
  let getState;
  let getCountry;
  let getCity;
  let getLocality;

  useEffect(() => {
    getLocality();
  }, [eventForm.district]);

  getLocality = async () => {
    await axios
      .get(`http://spyss.dollopinfotech.com/getAreaListByCityApi/${citiesUUID}`)
      .then((res) => {
        if (res.data) {
          setLocality(res.data.response);
        }
      });
  };

  useEffect(() => {
    getCity();
  }, [eventForm.valaya]);

  getCity = async () => {
    await axios
      .get(`http://spyss.dollopinfotech.com/getCityListByValayaApi/${valayaUUID}`)
      .then((res) => {
        if (res.data) {
          console.log("citiesssssssss", res.data.response);
          setCities(res.data.response);
        }
      });
  };

  useEffect(() => {
    getValaya();
  }, [eventForm.state]);

  getValaya = async () => {
    await axios
      .get(`http://spyss.dollopinfotech.com/getValayaByStateApi/${stateUUID}`)
      .then((res) => {
        if (res.data) {
          console.log("valayaassssss", res.data.response);
          setValaya(res.data.response);
        }
      });
  };

  useEffect(() => {
    getState();
  }, [eventForm.country]);

  getState = async () => {
    await axios
      .get(`http://spyss.dollopinfotech.com/getStateListApi/${countryUUID}`)
      .then((res) => {
        if (res.data) {
          console.log("countryyassssss", res.data.response);
          setState(res.data.response);
        }
      });
  };

  useEffect(() => {
    getCountry();
  }, []);
  getCountry = async () => {
    await axios.get("http://spyss.dollopinfotech.com/getCountryListApi").then((res) => {
      if (res.data) {
        console.log("countryyassssss", res.data.response);
        setCountry(res.data.response);
      }
    });
  };

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const closeModal = () => {
    handleClose();
  };

  const onSubmit = () => {
    // if(!errors){
    // closeModal();
    // }
    // alert(5);
    // if (eventForm) {
    console.log("yash :: ", eventForm);
    // }
  };

  const handleChange = (e) => {
    if (typeof e.target.value === "object") {
      console.log(e.target.value);
      if (e.target.value.valayaName) {
        alert(e.target.value.valayaName);
        setValayaUUID(e.target.value.uuid);

        setEventForm({ ...eventForm, [e.target.name]: e.target.value.valayaName });
      } else if (e.target.value.areaName) {
        alert(e.target.value.areaName);
        setEventForm({ ...eventForm, [e.target.name]: e.target.value.areaName });
      } else {
        setEventForm({ ...eventForm, [e.target.name]: e.target.value.name });
        setCountryUUID(e.target.value.uuid);
        setStateUUID(e.target.value.uuid);
        setCitiesUUID(e.target.value.uuid);
      }
    } else {
      setEventForm({ ...eventForm, [e.target.name]: e.target.value });
    }

    console.log("yash", eventForm);
  };

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
              <Typography sx={{ display: "flex", justifyContent: "space-between" }}>
                <MDTypography variant="h6" color="white">
                  Event Form
                </MDTypography>
                <Typography>
                  <CloseIcon onClick={() => closeModal()} />
                </Typography>
              </Typography>
            </MDBox>
            <MDBox pt={3}>
              <Card sx={{ overflowY: "scroll", height: "30rem" }}>
                <MDBox pt={4} pb={3} px={3}>
                  <MDBox onSubmit={handleSubmit(onSubmit())} component="form" role="form">
                    <Grid container spacing={2}>
                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <TextField
                          {...register("images")}
                          error={!!errors.images}
                          //  helperText={errors.images ? errors.images.message : ""}
                          label="Event Start Date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChangeCapture={(e) => {
                            handleChange(e);
                          }}
                          name="images"
                          type="file"
                          helperText={errors.images ? errors.images.message : ""}
                        />
                      </Grid>

                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <TextField
                          {...register("startDate")}
                          error={!!errors.startDate}
                          helperText={errors.startDate ? errors.startDate.message : ""}
                          onChangeCapture={(e) => {
                            handleChange(e);
                          }}
                          label="Event Start Date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          name="startDate"
                          type="Date"
                        />
                      </Grid>
                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <TextField
                          {...register("endDate")}
                          error={!!errors.endDate}
                          helperText={errors.endDate ? errors.endDate.message : ""}
                          onChangeCapture={(e) => {
                            handleChange(e);
                          }}
                          label="Event End Date"
                          // value={eventForm.endDate}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          name="endDate"
                          type="Date"
                        />
                      </Grid>
                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <TextField
                          {...register("title")}
                          error={!!errors.title}
                          helperText={errors.title ? errors.title.message : ""}
                          onChangeCapture={(e) => {
                            handleChange(e);
                          }}
                          label="Title"
                          name="title"
                          type="text"

                          // required
                        />
                      </Grid>
                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                          <InputLabel name="demo-simple-select-autowidth-label">
                            Event Mode
                          </InputLabel>
                          <Select
                            // onChange={(e) => handleChange(e)}
                            label="data"
                            autoWidth
                            name="committeMode"
                            input={<OutlinedInput label="committeMode" />}
                            {...register("committeMode")}
                            error={!!errors.committeMode}
                            onChangeCapture={(e) => handleChange(e)}
                            onBlur={handleChange}
                          >
                            <MenuItem value="online">Online</MenuItem>
                            <MenuItem value="offline">Offline</MenuItem>
                          </Select>
                          <p
                            style={{
                              color: "#F44335",
                              fontSize: "0.75rem",
                              marginLeft: "1rem",
                              fontStyle: "none",
                            }}
                          >
                            {errors.committeMode ? errors.committeMode.message : ""}
                          </p>
                        </FormControl>
                      </Grid>
                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                          <InputLabel name="demo-simple-select-autowidth-label">
                            Committe Level
                          </InputLabel>

                          <Select
                            name="committeLevel"
                            autoWidth
                            label="committeLevel"
                            input={<OutlinedInput label="committelevel" />}
                            {...register("committeLevel")}
                            error={!!errors.committelevel}
                            onChangeCapture={(e) => handleChange(e)}
                            onBlur={handleChange}
                          >
                            {[
                              "Branch / Shaake Level",
                              "Ward Level",
                              "Taluk Level",
                              " Sub City / UpaNagara Level",
                              "City / Nagara Level",
                              "Mahanagara Level",
                              "District / Jilla Level",
                              " Zone / Valaya Level",
                              " State / Prantha Level",
                              "Central / Kendra Level",
                            ].map((dt) => (
                              <MenuItem value={dt}>{dt}</MenuItem>
                            ))}
                          </Select>
                          <p
                            style={{
                              color: "#F44335",
                              fontSize: "0.75rem",
                              marginLeft: "1rem",
                              fontStyle: "none",
                            }}
                          >
                            {errors.committeLevel ? errors.committeLevel.message : ""}
                          </p>
                        </FormControl>
                      </Grid>
                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                          <InputLabel name="demo-simple-select-autowidth-label">Country</InputLabel>

                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            name="country"
                            // value={dropdownCountry}
                            autoWidth
                            // value={eventForm.country}
                            label="Country"
                            {...register("country")}
                            error={!!errors.country}
                            input={<OutlinedInput label="Country" />}
                            // onChangeCapture={(e) => {
                            //   handleChange(e);
                            // }}
                            onBlur={handleChange}
                          >
                            {country.map((dt) => (
                              <MenuItem value={dt}>{dt.name}</MenuItem>
                            ))}
                          </Select>
                          <p
                            style={{
                              color: "#F44335",
                              fontSize: "0.75rem",
                              marginLeft: "1rem",
                              fontStyle: "none",
                            }}
                          >
                            {errors.country ? errors.country.message : ""}
                          </p>
                        </FormControl>
                      </Grid>
                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                          <InputLabel name="demo-simple-select-autowidth-label">State</InputLabel>

                          <Select
                            {...register("state")}
                            name="state"
                            autoWidth
                            label="State"
                            input={<OutlinedInput label="committelevel" />}
                            onChangeCapture={(e) => handleChange(e)}
                            onBlur={handleChange}
                          >
                            {state.map((dt) => (
                              <MenuItem value={dt}>{dt.name}</MenuItem>
                            ))}
                          </Select>
                          <p
                            style={{
                              color: "#F44335",
                              fontSize: "0.75rem",
                              marginLeft: "1rem",
                              fontStyle: "none",
                            }}
                          >
                            {errors.state ? errors.state.message : ""}
                          </p>
                        </FormControl>
                      </Grid>
                      <Grid name item lg={6} xs={12} mb={2} md={12}>
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                          <InputLabel name="demo-simple-select-autowidth-label">Valaya</InputLabel>

                          <Select
                            {...register("valaya")}
                            labelId="demo-simple-select-autowidth-label"
                            name="valaya"
                            // value={dropdownCountry}

                            // value={eventForm.valaya}
                            autoWidth
                            label="valaya"
                            input={<OutlinedInput label="committelevel" />}
                            onChangeCapture={(e) => handleChange(e)}
                            onBlur={handleChange}
                          >
                            {valaya.map((dt) => (
                              <MenuItem value={dt}>{dt.valayaName}</MenuItem>
                            ))}
                          </Select>
                          <p
                            style={{
                              color: "#F44335",
                              fontSize: "0.75rem",
                              marginLeft: "1rem",
                              fontStyle: "none",
                            }}
                          >
                            {errors.valaya ? errors.valaya.message : ""}
                          </p>
                        </FormControl>
                      </Grid>
                      <Grid name item lg={6} xs={12} mb={2} md={12}>
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                          <InputLabel name="demo-simple-select-autowidth-label">
                            District
                          </InputLabel>

                          <Select
                            {...register("district")}
                            labelId="demo-simple-select-autowidth-label"
                            name="district"
                            // value={dropdownCountry}

                            // value={eventForm.district}
                            autoWidth
                            label="data"
                            input={<OutlinedInput label="committelevel" />}
                            onChangeCapture={(e) => handleChange(e)}
                            onBlur={handleChange}
                          >
                            {cities.map((dt) => (
                              <MenuItem value={dt}>{dt.name}</MenuItem>
                            ))}
                          </Select>
                          <p
                            style={{
                              color: "#F44335",
                              fontSize: "0.75rem",
                              marginLeft: "1rem",
                              fontStyle: "none",
                            }}
                          >
                            {errors.district ? errors.district.message : ""}
                          </p>
                        </FormControl>
                      </Grid>
                      <Grid name item lg={6} xs={12} mb={2} md={12}>
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                          <InputLabel name="demo-simple-select-autowidth-label">
                            Locality
                          </InputLabel>

                          <Select
                            {...register("locality")}
                            labelId="demo-simple-select-autowidth-label"
                            name="locality"
                            // value={dropdownCountry}

                            // value={eventForm.locality}
                            autoWidth
                            label="data"
                            input={<OutlinedInput label="locality" />}
                            onChangeCapture={(e) => handleChange(e)}
                            onBlur={handleChange}
                          >
                            {locality.map((dt) => (
                              <MenuItem onClick={() => setOtherLocalitty(false)} value={dt}>
                                {dt.areaName}
                              </MenuItem>
                            ))}
                            <MenuItem value="Other" onClick={() => setOtherLocalitty(true)}>
                              Other
                            </MenuItem>
                          </Select>
                          <p
                            style={{
                              color: "#F44335",
                              fontSize: "0.75rem",
                              marginLeft: "1rem",
                              fontStyle: "none",
                            }}
                          >
                            {errors.locality ? errors.locality.message : ""}
                          </p>
                        </FormControl>
                      </Grid>
                      {otherLocalitty === true ? (
                        <Grid item lg={6} xs={12} mb={2} md={12}>
                          <FormControl sx={{ m: 1, minWidth: 80 }}>
                            <TextField
                              {...register("otherLocalitty")}
                              onChangeCapture={(e) => {
                                handleChange(e);
                              }}
                              error={!!errors.otherLocalitty}
                              helperText={
                                errors.otherLocalitty ? errors.otherLocalitty.message : ""
                              }
                              label="Other Locality"
                              name="otherLocalitty"
                              type="text"
                            />
                          </FormControl>
                        </Grid>
                      ) : (
                        " "
                      )}
                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                          <TextField
                            {...register("pinCode")}
                            label="Pin Code"
                            onChangeCapture={handleChange}
                            // value={eventForm.pinCode}
                            error={!!errors.pinCode}
                            helperText={errors.pinCode ? errors.pinCode.message : ""}
                            name="pinCode"
                            type="numeric"
                          />
                        </FormControl>
                      </Grid>
                      <Button sx={{}} onClick={()=>setMore(true)} variant="contained" endIcon={<SendIcon />}>
                        More Field
                      </Button>

                      {more ?
                      <>
                      <Grid name item lg={6} xs={12} mb={2} md={12}>
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                          <InputLabel name="eventStatus">Event Status</InputLabel>

                          <Select
                            {...register("eventStatus")}
                            labelId="demo-simple-select-autowidth-label"
                            name="eventStatus"
                            // value={dropdownCountry}
                            onChangeCapture={handleChange}
                            onBlur={handleChange}
                            // value={eventForm.eventStatus}
                            autoWidth
                            label="data"
                            input={<OutlinedInput label="committelevel" />}
                          >
                            {[
                              "YetToStart",
                              "OpenForRegistration",
                              "RegistrationClosed",
                              "OnHold",
                              " In Progress",
                              "Cancelled",
                              "Completed",
                            ].map((dt) => (
                              <MenuItem value={dt}>{dt}</MenuItem>
                            ))}
                          </Select>
                          <p
                            style={{
                              color: "#F44335",
                              fontSize: "0.75rem",
                              marginLeft: "1rem",
                              fontStyle: "none",
                            }}
                          >
                            {errors.eventStatus ? errors.eventStatus.message : ""}
                          </p>
                        </FormControl>
                      </Grid>
                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <FormControl sx={{ m: 1, minWidth: 160 }}>
                          <TextField
                            {...register("shortDescription")}
                            error={!!errors.shortDescription}
                            helperText={
                              errors.shortDescription ? errors.shortDescription.message : ""
                            }
                            sx={{ width: "19rem" }}
                            name="shortDescription"
                            onChangeCapture={handleChange}
                            label="Short Description"
                            multiline
                            // value={eventForm.shortDescription}
                            maxRows={2}
                            variant="outlined"
                          />
                        </FormControl>
                      </Grid>
                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <FormControl sx={{ m: 1, minWidth: 160 }}>
                          <TextField
                            {...register("fullDiscription")}
                            error={!!errors.fullDiscription}
                            helperText={
                              errors.fullDiscription ? errors.fullDiscription.message : ""
                            }
                            sx={{ width: "19rem" }}
                            name="fullDiscription"
                            onChangeCapture={(e) => {
                              handleChange(e);
                            }}
                            // value={eventForm.fullDiscription}
                            label="Full Description"
                            multiline
                            maxRows={4}
                            variant="outlined"
                          />
                        </FormControl>
                      </Grid>
                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <TextField
                          {...register("hashTag")}
                          error={!!errors.hashTag}
                          helperText={errors.hashTag ? errors.hashTag.message : ""}
                          label="Hash Tag"
                          onChangeCapture={(e) => {
                            handleChange(e);
                          }}
                          // value={eventForm.hashTag}

                          name="hashTag"
                          type="text"
                        />
                      </Grid>
                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <TextField
                          {...register("startTime")}
                          error={!!errors.startTime}
                          helperText={errors.startTime ? errors.startTime.message : ""}
                          label="Start Time"
                          onChangeCapture={(e) => {
                            handleChange(e);
                          }}
                          name="startTime"
                          // value={eventForm.startTime}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          type="time"
                        />
                      </Grid>
                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <TextField
                          {...register("endTime")}
                          error={!!errors.endTime}
                          helperText={errors.endTime ? errors.endTime.message : ""}
                          label="End Time"
                          // value={eventForm.endTime}
                          onChangeCapture={(e) => {
                            handleChange(e);
                          }}
                          name="endTime"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          type="time"
                        />
                      </Grid>
                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <TextField
                          {...register("audience")}
                          error={!!errors.audience}
                          helperText={errors.audience ? errors.audience.message : ""}
                          label="Audience"
                          onChangeCapture={(e) => {
                            handleChange(e);
                          }}
                          // value={eventForm.audience}
                          name="audience"
                          type="text"
                        />
                      </Grid>
                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <TextField
                          {...register("agenda")}
                          error={!!errors.agenda}
                          helperText={errors.agenda ? errors.agenda.message : ""}
                          label="Agenda"
                          onChangeCapture={(e) => {
                            handleChange(e);
                          }}
                          // value={eventForm.agenda}
                          name="agenda"
                          type="text"
                        />
                      </Grid>
                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <TextField
                          {...register("primaryNumber")}
                          error={!!errors.primaryNumber}
                          helperText={errors.primaryNumber ? errors.primaryNumber.message : ""}
                          label="Primary Contact Number"
                          onChangeCapture={(e) => {
                            handleChange(e);
                          }}
                          name="primaryNumber"
                          // value={eventForm.primaryNumber}
                          type="tel"
                        />
                      </Grid>
                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <TextField
                          {...register("secondaryNumber")}
                          label="Secondary Contact Number"
                          error={!!errors.secondaryNumber}
                          helperText={errors.secondaryNumber ? errors.secondaryNumber.message : ""}
                          name="secondaryNumber"
                          onChangeCapture={(e) => handleChange(e)}
                          // value={eventForm.secondaryNumber}
                          type="tel"
                        />
                      </Grid>
                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <TextField
                          {...register("insturctions")}
                          error={!!errors.insturctions}
                          helperText={errors.insturctions ? errors.insturctions.message : ""}
                          label="instructions For Event"
                          onChangeCapture={(e) => {
                            handleChange(e);
                          }}
                          name="insturctions"
                          // value={eventForm.insturctions}
                          type="text"
                        />
                      </Grid>
                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <TextField
                          {...register("criteria")}
                          error={!!errors.criteria}
                          helperText={errors.criteria ? errors.criteria.message : ""}
                          label="Eligibility Criteria"
                          onChangeCapture={(e) => {
                            handleChange(e);
                          }}
                          name="criteria"
                          // value={eventForm.criteria}
                          type="text"
                        />
                      </Grid>
                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <TextField
                          {...register("sanchalakName")}
                          error={!!errors.sanchalakName}
                          helperText={errors.sanchalakName ? errors.sanchalakName.message : ""}
                          label="Sanchalak Name"
                          onChangeCapture={(e) => {
                            handleChange(e);
                          }}
                          // value={eventForm.sanchalakName}
                          name="sanchalakName"
                          type="text"
                        />
                      </Grid>
                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <TextField
                          {...register("sevaParmukhName")}
                          error={!!errors.sevaParmukhName}
                          helperText={errors.sevaParmukhName ? errors.sevaParmukhName.message : ""}
                          label="Seva Pramukh Name"
                          onChangeCapture={(e) => {
                            handleChange(e);
                          }}
                          // value={eventForm.sevaParmukhName}
                          name="sevaParmukhName"
                          type="text"
                        />
                      </Grid>
                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <TextField
                          {...register("treasurer")}
                          error={!!errors.treasurer}
                          helperText={errors.treasurer ? errors.treasurer.message : ""}
                          onChangeCapture={(e) => {
                            handleChange(e);
                          }}
                          // value={eventForm.treasurer}
                          label="Treasurer Name"
                          name="treasurer"
                          type="text"
                        />
                      </Grid>
                      <Grid item lg={6} xs={12} mb={2} md={12}>
                        <TextField
                          {...register("timeStamp")}
                          error={!!errors.timeStamp}
                          helperText={errors.timeStamp ? errors.timeStamp.message : ""}
                          label="Time Stamp"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChangeCapture={(e) => {
                            handleChange(e);
                          }}
                          // value={eventForm.timeStamp}
                          name="timeStamp"
                          type="time"
                        />
                      </Grid>
                      </>
                      :" "}
                    </Grid>

                    <MDBox mt={4} mb={1}>
                      <Button
                        variant="gradient"
                        type="submit"
                        color="info"
                        // onClick={!!errors ? closeModal() :" "}
                        fullWidth
                      >
                        {!name ? "Add Upa Valaya" : "Update Valaya"}
                      </Button>
                      {/* <MDButton
                        variant="gradient"
                        color="info"
                 
                        fullWidth
                        
                      >
                        {!name ? "Add Upa Valaya" : "Update Valaya"}
                      </MDButton> */}
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

export default EventForm;
