import React, { useState, useEffect } from "react";
import { Breadcrumbs, Link, TextField, Typography } from "@mui/material";
import { Group } from "@mui/icons-material";
// import AddCustomerForm from "./AddCustomerForm";
import Datatable from "../Datatable";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../Loading";
import CustomerForm from "./CustomerForm";
// import ConfirmModal from "../ConfirmModal";
import HeaderTableButton from "../HeaderTableButton";
// import Product from "../ProductMenu/ProductList";
// import FileSaver from "file-saver";


const CustomerPage = (props) => {
    const columns = [

        {
            field: "name",
            headerName: "Customer Name",
            width: 200,

        },
        { field: "email", headerName: "Email", width: 300 },
        { field: "address", headerName: "Address", width: 330 },


    ];
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [rowCount, setRowCount] = useState(0);
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 10,
        page: 0,
    });
    const [search, setSearch] = useState("");
    const [showLoading, setShowLoading] = useState(false);
    const [rowId, setRowId] = useState(0);
    const [isUpdated, setIsUpdated] = useState(false);
    const [sortModel, setSortModel] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [isNew, setIsNew] = useState(true);
    const [customer, setCustomer] = useState("");

    useEffect(() => {
        fetchCustomersData();
    }, [props.ziggy.location, paginationModel, search, sortModel]);

    const fetchCustomersData = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get("/customer/lead/data");
            setRows(response.data);
            // setRowCount(response.data.total);
        } catch (error) {
            setHasError(true);
            setTimeout(() => {
                throw error;
            });
        } finally {
            setIsLoading(false);
        }
    };
    const deleteCustomerData = async (id) => {
        try {
            const response = await axios.delete("/delete_customer/" + id);
            Swal.fire({
                icon: "success",
                title: response.data.message,
                timer: 1500,
            });
            fetchCustomersData();
        } catch (error) {
            Swal.fire({
                title: "Oops",
                text: error.response.data,
                icon: "error",
                timer: 1500,
            });
        }
    };
    const handleDeleteClick = async (id) => {
        setShowLoading(true);
        await deleteCustomerData(id);
        // setRowId(0);
        setShowLoading(false);
    };
    // const downloadCustomersData = async () => {
    //     try {
    //         const response = await axios.get("/customers/export", {
    //             responseType: "blob",
    //         });
    //         const blob = new Blob([response.data], {
    //             type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    //         });
    //         FileSaver.saveAs(blob, "customers.xlsx");
    //     } catch (error) {
    //         Swal.fire({
    //             title: "Oops",
    //             text: "Failed download data",
    //             icon: "error",
    //             timer: 1500,
    //         });
    //     }
    // };

    const handleSaveUpdateClick = async () => {
        setShowLoading(true);
        await updateCustomerData();
        setShowLoading(false);
    };
    const handleDiscardChanges = () => {
        fetchCustomersData();
        Swal.fire({
            icon: "success",
            title: "Successfully discard changes",
            timer: 1500,
        });
        setIsUpdated(false);
    };
    const getCustomerDetails = (id) => {
        setCustomer(rows.find(item=> item.id === id));
    }
    const handleEditClick = (id) => {
        setIsNew(false);
        getCustomerDetails(id);
    };
    console.log(rows);
    console.log(customer);


    return (
        <>
            {/* {hasError && <Error />} */}

            <Loading isLoading={showLoading} />
            { (
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-lg-12">
                            <div
                                className="card shadow-sm"
                                style={{ width: "100%" }}
                            >
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <Group /> Customer List
                                    </h5>

                                    <div className="d-flex justify-content-end button-group mb-4">
                                        <HeaderTableButton
                                            isUpdated={isUpdated}
                                            addButton="#customerModal"
                                            typeAddButton="customer"
                                            setIsNew={setIsNew}

                                        />
                                    </div>
                                    <div className="d-flex justify-content-end mb-2">
                                        {/* <TextField
                                            id="standard-basic"
                                            label="Search"
                                            variant="standard"
                                            value={search}
                                            onChange={(e) =>
                                                setSearch(e.target.value)
                                            }
                                        /> */}
                                    </div>
                                    <div className="row">
                                        <Datatable
                                            rows={rows}
                                            columns={columns}
                                            setRows={setRows}
                                            isLoading={isLoading}
                                            rowCount={rowCount}
                                            paginationModel={paginationModel}
                                            setPaginationModel={
                                                setPaginationModel
                                            }
                                            setRowId={setRowId}
                                            setIsUpdated={setIsUpdated}
                                            type="customer"
                                            sortModel={sortModel}
                                            setSortModel={setSortModel}
                                            isUpdated={isUpdated}
                                            handleEditClick={handleEditClick}
                                            targetModal="#customerModal"
                                            deleteById={handleDeleteClick}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <CustomerForm
                // user={props.auth.user.username}
                getCustomer={fetchCustomersData}
                isNew={isNew}
                customer={customer}

            />
            {/*
            <ConfirmModal
                id="deleteModal"
                type="delete"
                text="Are you sure want to delete?"
                handleClick={() => handleDeleteClick(rowId)}
            />
            <ConfirmModal
                id="updateModal"
                type="update"
                text="Are you sure want to save?"
                handleClick={() => handleSaveUpdateClick()}
            />
            <ConfirmModal
                id="discardModal"
                type="delete"
                text="Are you sure want to discard this change? Any changes will be lost"
                handleClick={() => handleDiscardChanges()}
            /> */}
        </>
    );
};

export default CustomerPage;
