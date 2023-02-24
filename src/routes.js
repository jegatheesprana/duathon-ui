

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";


// import SignUp from "layouts/authentication/sign-up";
import { Navigate, useRoutes } from "react-router-dom";

import { SignIn, ForgotPassword, ResetPassword } from 'pages/authentication'

// @mui icons
import Icon from "@mui/material/Icon";
import BadgeIcon from '@mui/icons-material/Badge';

// Pages
import NewEmployee from "pages/employee/NewEmployee";
import ListEmployees from "pages/employee/ListEmployees";
import NewBuilding from "pages/building/NewBuilding";
import ListBuildings from "pages/building/ListBuildings";
import NewResource from "pages/resource/NewResource";
import ListResources from "pages/resource/ListResources";
import NewDepartment from "pages/department/NewDepartment";
import ListDepartments from "pages/department/ListDepartments";
import NewApartment from "pages/apartment/NewApartment";
import ListApartments from "pages/apartment/ListApartments";
import ViewApartment from "pages/apartment/viewApartment";
import ViewBuilding from "pages/building/viewBuilding/"
import NewFacilityCategory from "pages/facilityCategory/NewFacilityCategory";
import ListFacilityCategories from "pages/facilityCategory/ListFacilityCategories";
import NewFacility from "pages/facility/NewFacility";
import ViewFacility from "pages/facility/viewFacility";
import NewCustomer from "pages/customer/NewCustomer";
import ListCustomers from "pages/customer/ListCustomers";
import NewRole from "pages/role/NewRole";
import ListRoles from "pages/role/ListRoles";
import NewFloor from "pages/floor/NewFloor"
import ListFloors from "pages/floor/ListFloors";
import ViewEmployee from "pages/employee/viewEmployee";
import ViewCustomer from "pages/customer/viewCustomer";
import ViewFloor from "pages/floor/viewFloor"
import NewFacilityMembership from "pages/facilityMembership/newFacilityMembership"
import ViewFacilityMembership from "pages/facilityMembership/viewFacilityMembership"
import ViewRoleInfo from "pages/role/viewRole";
import EditOwner from "pages/apartment/EditOwner";
import NewMultipleApartment from "pages/apartment/NewMultipleApartment";


const routes = [
    {
        type: "collapse",
        name: "Dashboard",
        key: "dashboard",
        icon: <Icon fontSize="small">dashboard</Icon>,
        route: "/dashboard",
        component: <Dashboard />,
    },
    // {
    //   type: "collapse",
    //   name: "Tables",
    //   key: "tables",
    //   icon: <Icon fontSize="small">table_view</Icon>,
    //   route: "/tables",
    //   component: <Tables />,
    // },
    // {
    //   type: "collapse",
    //   name: "Billing",
    //   key: "billing",
    //   icon: <Icon fontSize="small">receipt_long</Icon>,
    //   route: "/billing",
    //   component: <Billing />,
    // },
    // {
    //   type: "collapse",
    //   name: "RTL",
    //   key: "rtl",
    //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    //   route: "/rtl",
    //   component: <RTL />,
    // },
    // {
    //   type: "collapse",
    //   name: "Notifications",
    //   key: "notifications",
    //   icon: <Icon fontSize="small">notifications</Icon>,
    //   route: "/notifications",
    //   component: <Notifications />,
    // },
    // {
    //   type: "collapse",
    //   name: "Profile",
    //   key: "profile",
    //   icon: <Icon fontSize="small">person</Icon>,
    //   route: "/profile",
    //   component: <Profile />,
    // },
    {
        // type: "collapse",
        name: "Add Employee",
        key: "addEmployee",
        icon: <Icon fontSize="small">person</Icon>,
        route: "/employees/new",
        component: <NewEmployee />,
    },
    {
        // type: "collapse",
        name: "Add Building",
        key: "addBuilding",
        icon: <Icon fontSize="small">person</Icon>,
        route: "/buildings/new",
        component: <NewBuilding />,
    },
    {
        // type: "collapse",
        name: "Add Resource",
        key: "addResource",
        icon: <Icon fontSize="small">person</Icon>,
        route: "/resources/new",
        component: <NewResource />,
    },
    {
        // type: "collapse",
        name: "Add Facility Category",
        key: "addFacilityCategory",
        icon: <Icon fontSize="small">person</Icon>,
        route: "/facilityCategories/new",
        component: <NewFacilityCategory />,
    },
    {
        // type: "collapse",
        name: "Add Facility",
        key: "addFacility",
        icon: <Icon fontSize="small">person</Icon>,
        route: "/buildings/view/:buildingId/facilities/new",
        component: <NewFacility />,
    },
    {
        // type: "collapse",
        name: "Add Customer",
        key: "addCustomer",
        icon: <Icon fontSize="small">person</Icon>,
        route: "/customers/new",
        component: <NewCustomer />,
    },
    {
        // type: "collapse",
        name: "Add Role",
        key: "addRole",
        icon: <Icon fontSize="small">person</Icon>,
        route: "/roles/new",
        component: <NewRole />,
    },
    {
        // type: "collapse",
        name: "Edit Employee",
        key: "editEmployee",
        icon: <Icon fontSize="small">person</Icon>,
        route: "/employees/edit/:id",
        component: <NewEmployee />,
    },
    {
        // type: "collapse",
        name: "Edit Role",
        key: "editRole",
        icon: <Icon fontSize="small">person</Icon>,
        route: "/roles/edit/:id",
        component: <NewRole />,
    },
    {
        // type: "collapse",
        name: "Edit Floor",
        key: "editFloor",
        icon: <Icon fontSize="small">person</Icon>,
        route: "/buildings/view/:buildingId/floors/edit/:id",
        component: <NewFloor />,
    },
    {
        // type: "collapse",
        name: "Edit Customer",
        key: "editCustomer",
        icon: <Icon fontSize="small">person</Icon>,
        route: "/customers/edit/:id",
        component: <NewCustomer />,
    },
    {
        // type: "collapse",
        name: "Edit Building",
        key: "editBuilding",
        icon: <Icon fontSize="small">person</Icon>,
        route: "/buildings/edit/:id",
        component: <NewBuilding />,
    },
    {
        // type: "collapse",
        name: "Edit Resource",
        key: "editResource",
        icon: <Icon fontSize="small">person</Icon>,
        route: "/resources/edit/:id",
        component: <NewResource />,
    },
    {
        // type: "collapse",
        name: "Edit Facility Category",
        key: "editFacilityCategory",
        icon: <Icon fontSize="small">person</Icon>,
        route: "/facilityCategories/edit/:id",
        component: <NewFacilityCategory />,
    },
    {
        // type: "collapse",
        name: "Edit Facility",
        key: "editFacility",
        icon: <Icon fontSize="small">person</Icon>,
        route: "/buildings/view/:buildingId/facilities/edit/:id",
        component: <NewFacility />,
    },
    {
        type: "collapse",
        name: "Employee",
        key: "employees",
        icon: <BadgeIcon />,
        route: "/employees",
        component: <ListEmployees />,
    },
    {
        type: "collapse",
        name: "Customer",
        key: "customers",
        icon: <Icon fontSize="small">person</Icon>,
        route: "/customers",
        component: <ListCustomers />,
    },
    {
        type: "collapse",
        name: "Role",
        key: "roles",
        icon: <Icon fontSize="small">admin_panel_settings</Icon>,
        route: "/roles",
        component: <ListRoles />,
    },
    // {
    //     type: "multiLevel",
    //     name: 'kaj',
    //     route: "#",
    //     icon: <Icon fontSize="small">person</Icon>,
    //     items: [
    //         {
    //             type: "collapse",
    //             name: "Role",
    //             key: "roles",
    //             icon: <Icon fontSize="small">person</Icon>,
    //             route: "/roles",
    //             component: <ListRoles />,
    //         },
    //         {
    //             type: "collapse",
    //             name: "Building",
    //             key: "buildings",
    //             icon: <Icon fontSize="small">person</Icon>,
    //             route: "/buildings",
    //             component: <ListBuildings />,
    //         },
    //     ]
    // },
    {
        type: "collapse",
        name: "Building",
        key: "buildings",
        icon: <Icon fontSize="small">apartment</Icon>,
        route: "/buildings",
        component: <ListBuildings />,
    },
    {
        type: "collapse",
        name: "Resource",
        key: "resources",
        icon: <Icon fontSize="small">local_drink</Icon>,
        route: "/resources",
        component: <ListResources />,
    },
    {
        type: "collapse",
        name: "Facility Category",
        key: "facilityCategories",
        icon: <Icon fontSize="small">fitness_center</Icon>,
        route: "/facilityCategories",
        component: <ListFacilityCategories />,
    },
    {
        // type: "collapse",
        name: "Add Department",
        key: "addDepartment",
        icon: <Icon fontSize="small">person</Icon>,
        route: "/departments/new",
        component: <NewDepartment />,
    },
    {
        //type: "collapse",
        name: "Edit Department",
        key: "editDepartment",
        icon: <Icon fontSize="small">person</Icon>,
        route: "/departments/edit/:id",
        component: <NewDepartment />,
    },
    {
        type: "collapse",
        name: "Department",
        key: "department",
        icon: <Icon fontSize="small">store</Icon>,
        route: "/departments",
        component: <ListDepartments />,
    },
    // {
    //     type: "collapse",
    //     name: "Apartment",
    //     key: "apartment",
    //     icon: <Icon fontSize="small">person</Icon>,
    //     route: "/apartments",
    //     component: <ListApartments />,
    // },
    {
        //type: "collapse",
        name: "Add Apartment",
        key: "addApartment",
        icon: <Icon fontSize="small">person</Icon>,
        route: "/buildings/view/:buildingId/apartments/new",
        component: <NewMultipleApartment />,
    },
    {
        //type: "collapse",
        name: "Add Floor",
        key: "addFloor",
        icon: <Icon fontSize="small">person</Icon>,
        route: "/buildings/view/:buildingId/floors/new",
        component: <NewFloor />,
    },
    {
        //type: "collapse",
        name: "View Floor",
        key: "viewFloor",
        icon: <Icon fontSize="small">person</Icon>,
        route: "/buildings/view/:buildingId/floors/view/:id",
        component: <ViewFloor />,
    },
    {
        //type: "collapse",
        name: "Edit Apartment",
        key: "editApartment",
        icon: <Icon fontSize="small">person</Icon>,
        route: "/buildings/view/:buildingId/apartments/edit/:id",
        component: <NewApartment />,
    },
    {
        //type: "collapse",
        name: "Edit Owner",
        key: "editOwner",
        icon: <Icon fontSize="small">person</Icon>,
        route: "/buildings/view/:buildingId/apartments/assignOwner/:id",
        component: <EditOwner />,
    },
    // {
    //   type: "collapse",
    //   name: "Sign In",
    //   key: "sign-in",
    //   icon: <Icon fontSize="small">login</Icon>,
    //   route: "/authentication/sign-in",
    //   component: <SignIn />,
    // },
    {
        // type: "collapse",
        name: "View Building",
        key: "viewBuilding",
        icon: <Icon fontSize="small">View Building</Icon>,
        route: "/buildings/view/:id/:tab",
        component: <ViewBuilding />,
    },
    {
        // type: "collapse",
        name: "View Employee",
        key: "viewEmployee",
        icon: <BadgeIcon />,
        route: "/employees/view/:id",
        component: <ViewEmployee />,
    },
    {
        // type: "collapse",
        name: "View Customer",
        key: "viewCustomer",
        icon: <Icon fontSize="small">View Building</Icon>,
        route: "/customers/view/:id",
        component: <ViewCustomer />,
    },
    {
        // type: "collapse",
        name: "View Apartment",
        key: "viewApartment",
        icon: <Icon fontSize="small">View Apartment</Icon>,
        route: "/buildings/view/:buildingId/apartments/view/:apartmentId",
        component: <ViewApartment />,
    },
    {
        // type: "collapse",
        name: "New FacilityMembership",
        key: "newFacilityMembership",
        icon: <Icon fontSize="small">New FacilityMembership</Icon>,
        route: "/buildings/view/:buildingId/facilityMembership/new",
        component: <NewFacilityMembership />,
    },
    {
        // type: "collapse",
        name: "Edit FacilityMembership",
        key: "editFacilityMembership",
        icon: <Icon fontSize="small">Edit FacilityMembership</Icon>,
        route: "/buildings/view/:buildingId/facilityMembership/edit/:membershipId",
        component: <NewFacilityMembership />,
    },
    {
        // type: "collapse",
        name: "View FacilityMembership",
        key: "viewFacilityMembership",
        icon: <Icon fontSize="small">View FacilityMembership</Icon>,
        route: "/buildings/view/:buildingId/facilityMembership/view/:membershipId",
        component: <ViewFacilityMembership />,
    },
    {
        // type: "collapse",
        name: "View Facility",
        key: "viewFacility",
        icon: <Icon fontSize="small">View Facility</Icon>,
        route: "/buildings/view/:buildingId/facilities/view/:facilityId",
        component: <ViewFacility />,
    },
    {
        // type: "collapse",
        name: "View Role",
        key: "viewRole",
        icon: <Icon fontSize="small">View Role</Icon>,
        route: "/roles/view/:roleId",
        component: <ViewRoleInfo />,
    },
    // {
    //   type: "collapse",
    //   name: "Sign Up",
    //   key: "sign-up",
    //   icon: <Icon fontSize="small">assignment</Icon>,
    //   route: "/authentication/sign-up",
    //   component: <SignUp />,
    // },
    {
        key: "sign-in",
        icon: <Icon fontSize="small">login</Icon>,
        route: "*",
        component: <Navigate to="/dashboard" replace={true} />,
    },
];


const authRoutes = [
    {
        key: "login",
        route: "/authentication/login",
        component: <SignIn />,
    },
    {
        key: "signup",
        route: "/authentication/signup",
        component: <SignUp />,
    },
    {
        key: "login",
        route: "/authentication/login/:type",
        component: <SignIn />,
    },
    // { path: 'forgotPassword', element: <ForgotPassword /> },
    // { path: 'resetPassword/:email/:token', element: <ResetPassword /> },
    // { path: 'register', element: <Register /> },
    {
        key: "forgotPassword",
        route: "/authentication/forgot-password",
        component: <ForgotPassword />,
    },
    {
        key: "resetPassword",
        route: "/authentication/resetpassword/:email/:otp",
        component: <ResetPassword />,
    },
    {
        type: "collapse",
        name: "Sign In",
        key: "navigate",
        icon: <Icon fontSize="small">login</Icon>,
        route: "*",
        component: <Navigate to="/authentication/login/redirected" />,
    },
]

export default routes;
export {
    authRoutes
}


// export function AuthRouter() {
//     return useRoutes([
//         {
//             path: "/authentication",
//             // element: <LogoOnlyLayout />,
//             children: [
//                 {
//                     type: "collapse",
//                     name: "Sign In",
//                     key: "sign-in",
//                     icon: <Icon fontSize="small">login</Icon>,
//                     route: "login",
//                     component: <SignIn />,
//                 },
//                 {
//                     type: "collapse",
//                     name: "Sign In",
//                     key: "sign-in",
//                     icon: <Icon fontSize="small">login</Icon>,
//                     route: "login/:type",
//                     component: <SignIn />,
//                 },
//                 // { path: "/", element: <Navigate to="login" /> },
//                 { path: "*", element: <Navigate to="login/redirected" /> },
//             ],
//         },
//     ]);
// }