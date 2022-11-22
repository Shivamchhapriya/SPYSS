/* eslint-disable */


import * as Yup from "yup";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const UserName = /^[A-Za-z. ]{2,10}$/  

const signupschemas = Yup.object().shape({

  Name:Yup.string().required("Please enter your name"),
  NearestLandMark:Yup.string().required("Please enter your Nearest Land MarK"),

  droCountry:Yup.object({/* what goes here ? */}).required('Please enter your country'),
  droCountrys:Yup.string({/* what goes here ? */}).required('Please enter your country'),

  DropdownStat:Yup.object({/* what goes here ? */}).required("Please enter your State"),
  DropdownStatsdata:Yup.string({/* what goes here ? */}).required("Please enter your State"),

  DropValaya:Yup.string().required("Please enter your Valaya"),

  dropcity:Yup.string().required("Please enter your District Name"),
  dropcitydata:Yup.array().object({}).required("Please enter your District Name"),


  upaValayacity:Yup.string().required("Please enter your UPA Valaya District"),
  wardnumberdata:Yup.string().required("Please enter your  ward Number Data"),
 
 
 
 
  Emaildata:Yup.string().email().required("Please enter your Email"),
  contactnumber:Yup.string().required("Please enter your Number").matches(phoneRegExp, 'Phone number is not valid').min(10, "to short").max(10, "to long"),

  Googlemapurl : Yup.string().matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,'Enter correct url!').required('Please enter website'),
  Branchstartdate: Yup.date().min("01-01-1940").max("01-01-2023").required(), 
  CloseDate: Yup.date().min("01-01-1940").max("01-01-2023").required(), 
  addressdata:Yup.string().required("Please enter your Address"),
  PinCode:Yup.string().required("Please enter your PinCode"),
  BranchEmaildata:Yup.string().email().required("Please enter your Email"),

  MukyaShikshakName:Yup.string().matches(UserName,"Please enter correct name").required("Please enter your Mukya Shikshak Name"),
  MukyaShikshak1Name:Yup.string().matches(UserName,"Please enter correct name").required("Please enter your Mukya Shikshak 1 Name"),
  Sahashikshak2name:Yup.string().matches(UserName,"Please enter correct name").required("Please enter your Saha Shikshak 2 Name"),
  SahaShikshak1Name:Yup.string().matches(UserName,"Please enter correct name").required("Please enter your Saha Shikshak 1 Name"),


  SahaShikshakcontactnumber:Yup.string().required("Please enter your Number") .matches(phoneRegExp, 'Phone number is not valid').min(10, "to short").max(10, "to long"),
  SahaShikshak1contactnumber:Yup.string().required("Please enter your Number") .matches(phoneRegExp, 'Phone number is not valid').min(10, "to short").max(10, "to long"),
  mukyaShikshakcontactnumber:Yup.string().required("Please enter your Number").matches(phoneRegExp, 'Phone number is not valid').min(10, "to short").max(10, "to long"),
  statusData:Yup.string().required("Please select Status "),
  reasonClosure:Yup.string().required("Please select Reason "),

}); 


 export default signupschemas;