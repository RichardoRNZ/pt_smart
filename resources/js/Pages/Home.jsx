import ErrorBoundary from "@/Layouts/ErrorBoundary";
import Sidebar from "@/Layouts/Main";

import React from "react";



const Home = (props) => {
    return (
        <div className="container">
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
                <ErrorBoundary>
                    <Sidebar {...props} />
                </ErrorBoundary>
            {/* </LocalizationProvider> */}
        </div>
    );
};

export default Home;
