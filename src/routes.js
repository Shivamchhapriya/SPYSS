// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";

// import Billing from "layouts/billing";
// import RTL from "layouts/rtl";
// import SignIn from "layouts/authentication/sign-in";

// @mui icons-
import Icon from "@mui/material/Icon";

import Valaya from "layouts/tables/showTables/Valaya";
import Login from "layouts/authentication/sign-in/login";
// import Area from "layouts/tables/showTables/area";
// import UpaArea from "layouts/tables/showTables/upaArea";
import BatchInBranch from "layouts/tables/showTables/Branch/Batch";
import DashboardIcon from '@mui/icons-material/Dashboard';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import EventIcon from '@mui/icons-material/Event';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import GroupIcon from '@mui/icons-material/Group';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded';
import BranchInArea from "layouts/tables/showTables/Branch/BranchInArea";
import Area from "layouts/tables/showTables/area";
import UpaArea from "layouts/tables/showTables/upaArea";
import Event from "layouts/tables/showTables/event";

const routes = [
  {
    type: "dashboard",
    name: "Dashboard",
    key: "dashboard",
    icon: <DashboardIcon />,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Valaya",
    key: "Valaya",
    icon: <PersonPinCircleIcon />,
    route: "/valaya",
    component: <Valaya />,
  },
  {
    type: "collapse",
    name: "Locality/village",
    key: "areaInCity",
    icon: <LocationCityRoundedIcon />,
    route: "/area",
    component: <Area/>,
  
  },
  {
    type: "collapse",
    name: "UPA Valaya",
    key: "upavalaya",
    icon: <HolidayVillageIcon />,
    route: "/upaValaya",
    component: <UpaArea/>,
  },
 
  // {
  //   type: "branch",
  //   branch: "Branch",
  //   name: "Branch",
  //   key: "branch",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/branch",
  //   component: <BranchInArea />,
  // },
  {
    type: "branch",
    branch: "Branch",
    name: "Branch",
    key: "branch",
    icon: <GroupIcon/>,
    route: "/branch",
    component: <BranchInArea />,
  },
  {
    type: "batch",
    branch: "Batch",
    name: " Batch",
    key: "batch",
    icon: <Diversity3Icon />,
    route: "/batch",
    component: <BatchInBranch />,
  },
  {
    type: "event",
    branch: "Event",
    name: "Event",
    key: "event",
    icon: <EventIcon />,
    route: "/event",
    component: <Event/>,
  },

  // {
  //   type: "area",
  //   name: "area",
  //   key: "area",
  //   icon: <BusinessIcon />,
  //   route: "/area",
  //   component: <Area />,
  // },
  // {
  //   type: "UPA",
  //   name: "UPA valaya",
  //   key: "upa",
  //   icon: <BusinessIcon />,
  //   route: "/upa",
  //   component: <UpaArea />,
  // },
  {
    type: "login",
    name: "Event",
    key: "allevents",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/login",
    component: <Login />,
    onlyRoute: true,
  },
 
];

export default routes;
