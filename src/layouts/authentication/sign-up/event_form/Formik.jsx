// import * as Yup from "yup";
// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/ 
// const UserName = /^[A-Za-z. ]{2,10}$/  
// export  const signupschemas = Yup.object({

//    name:Yup.string().matches(UserName,"Please enter correct name").required("Please enter your name"),
//    email:Yup.string().email().required("Please enter your email"),
//    password:Yup.string().min(8).required("Please enter your password").matches(
//        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
//        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
//      ),
//    confirm_password:Yup.string().required()
//    .oneOf([Yup.ref("password"),null],"Password must match"),
//    number:Yup.string()
//    .required("required")
//    .matches(phoneRegExp, 'Phone number is not valid')
//    .min(10, "to short")
//    .max(10, "to long"),

//    termsAndConditions: Yup.boolean()
//    .required('You need to accept the terms and conditions')
//    .oneOf([true]),


//    inlineRadioOptions: Yup.boolean().required().oneOf([0 , 1]),
// }); 
