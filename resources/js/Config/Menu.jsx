// import Customer from "@/Components/CustomerMenu/CustomerList";
// import Dashboard from "@/Components/Dashboard";
// import OrderDetail from "@/Components/OrderMenu/OrderDetail";
// import OrderList from "@/Components/OrderMenu/OrderList";
// import Product from "@/Components/ProductMenu/ProductList";
// import ReportPage from "@/Components/Reports/ReportPage";
// import ChangeUserForm from "@/Components/UserMenu/ChangeUserForm";

import CustomerPage from "@/Components/CustomerMenu/CustomerPage";
import MembershipsPage from "@/Components/ProjectMenu/MembershipsPage";
import ProjectPage from "@/Components/ProjectMenu/ProjectPage";
import ServicePage from "@/Components/ServiceMenu/ServicePage";
import { BarChart, CardMembership, Groups, Home, Inventory2, NetworkCheck, Receipt } from "@mui/icons-material";

export const renderMenuIcon = (menu) => {
    switch (menu) {
        case "Customers":
            return <Groups />;
        case "Services":
            return <NetworkCheck />;
        case "Projects":
            return <Receipt />;
        case "Memberships":
            return <CardMembership />;
        default:
            return null;
    }
};

export const sidebarMenuRouter = (menuUrl, props) => {

    switch (menuUrl) {
        case "/customers":
            return <CustomerPage {...props}/>;
        case "/products":
            return <ServicePage {...props}/>;
        case "/projects":
            return <ProjectPage {...props}/>;
        case "/memberships":
            return <MembershipsPage {...props}/>;
        // case "/reports":
        //     return <ReportPage {...props}/>;
        // case "/change/user/page":
        //     return <ChangeUserForm {...props}/>;
        default:
            return null;
    }
};


