
// Module 01 imports
import Dashboard from './views/Dashboard.jsx'
import ManageFilesForm from './views/ManageFilesForm.jsx';
//import UserProfile from './components/UserProfile'

// Module 03 imports
import Dashboard3 from './views/Dashboard3'
import FileForm from './views/FileForm'

// Old imports
import TableList from "./views/TableList.jsx";
import Typography from "./views/Typography.jsx";
import Icons from "./views/Icons.jsx";
import Maps from "./views/Maps.jsx";
import Notifications from "./views/Notifications.jsx";
import Upgrade from "./views/Upgrade.jsx"

// Module 02 imports
import Mpd from './views/Mpd'
import Form2 from './views/Form2'
import TchTraffic from './views/TchTraffic'
import TchTraffic1800 from './views/TchTraffic1800'
import TchTraffic900 from './views/TchTraffic900'
import DropsBss from './views/DropsBss'
import DropsHo from './views/DropsHo'
import DropsRf from './views/DropsRf'
import TchAvailability from './views/TchAvailability'
import SdcchBlocking from './views/SdcchBlocking'
import TchRawBlocking from './views/TchRawBlocking'
import Dashboard2 from './views/Dashboard2'

const dashboardRoutes = [

  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   icon: '',
  //   component: Dashboard3,
  //   layout: '/admin'
  // },
  // {
  //   path: '/files',
  //   name: 'Manage Files',
  //   icon: '',
  //   component: FileForm,
  //   layout: '/admin'
  // }


  // Routes for Module 01

  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   icon: '',
  //   component: Dashboard,
  //   layout: '/admin'
  // },
  // {
  //   path: 'files',
  //   name: 'Manage Files',
  //   icon: '',
  //   component: ManageFilesForm,
  //   layout: '/admin'

  // }

  // Routes for Module 02

  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: '',
    component: Dashboard2,
    layout: '/admin'
  },
  {
    path: '/files',
    name: 'Manage Files',
    icon: '',
    component: Form2,
    layout: '/admin'
  },
  {
    path: "/mpd",
    name: "Minutes Per Drop",
    icon: "",
    component: Mpd,
    layout: "/admin"
  },
  {
    path: "/tchtraffic",
    name: "Tch Traffic",
    icon: "",
    component: TchTraffic,
    layout: "/admin"
  },
  {
    path: "/tch_1800",
    name: 'Tch Traffic 1800',
    icon: "",
    component: TchTraffic1800,
    layout: "/admin"
  },
  {
    path: "/tch_900",
    name: "Tch Traffic 900",
    icon: "",
    component: TchTraffic900,
    layout: "/admin"
  },
  {
    path: "/ho",
    name: "Drops Ho",
    icon: "",
    component: DropsHo,
    layout: "/admin"
  },
  {
    path: "/rf",
    name: "Drop Rf",
    icon: "",
    component: DropsRf,
    layout: "/admin"
  },
  {
    path: "/availability",
    name: "Tch Availability",
    icon: "",
    component: TchAvailability,
    layout: "/admin"
  },
  // {
  //   path: "/sdcch_blocking",
  //   name: "Sdcch Blocking",
  //   icon: "",
  //   component: SdcchBlocking,
  //   layout: "/admin"
  // },
  {
    path: "/raw_blocking",
    name: "Tch Raw Blocking",
    icon: "",
    component: TchRawBlocking,
    layout: "/admin"
  }



  // },
  // {
  //   path: "/model",
  //   name: "Model",
  //   icon: "pe-7s-note2",
  //   component: TableList,
  //   layout: "/admin"
  // }
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "pe-7s-news-paper",
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "pe-7s-science",
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "pe-7s-map-marker",
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "pe-7s-bell",
  //   component: Notifications,
  //   layout: "/admin"
  // },
  // {
  //   upgrade: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "pe-7s-rocket",
  //   component: Upgrade,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
