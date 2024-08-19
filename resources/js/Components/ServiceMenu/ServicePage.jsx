import React, { useState, useEffect } from "react";
import { Breadcrumbs, Link, TextField, Typography } from "@mui/material";
import { Group, NetworkCheck } from "@mui/icons-material";
// import AddserviceForm from "./AddserviceForm";
import Datatable from "../Datatable";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../Loading";
// import serviceForm from "./serviceForm";
// import ConfirmModal from "../ConfirmModal";
import HeaderTableButton from "../HeaderTableButton";
import ServiceForm from "./ServiceForm";
// import Product from "../ProductMenu/ProductList";
// import FileSaver from "file-saver";


const ServicePage = (props) => {
    const columns = [

        {
            field: "name",
            headerName: "service Name",
            width: 900,

        },



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
    const [service, setservice] = useState("");

    useEffect(() => {
        fetchservicesData();
    }, [props.ziggy.location, paginationModel, search, sortModel]);

    const fetchservicesData = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get("/product/data");
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
    const deleteserviceData = async (id) => {
        try {
            const response = await axios.delete("/delete_product/" + id);
            Swal.fire({
                icon: "success",
                title: response.data.message,
                timer: 1500,
            });
            fetchservicesData();
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
        await deleteserviceData(id);
        // setRowId(0);
        setShowLoading(false);
    };
    // const downloadservicesData = async () => {
    //     try {
    //         const response = await axios.get("/services/export", {
    //             responseType: "blob",
    //         });
    //         const blob = new Blob([response.data], {
    //             type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    //         });
    //         FileSaver.saveAs(blob, "services.xlsx");
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
        await updateserviceData();
        setShowLoading(false);
    };
    const handleDiscardChanges = () => {
        fetchservicesData();
        Swal.fire({
            icon: "success",
            title: "Successfully discard changes",
            timer: 1500,
        });
        setIsUpdated(false);
    };
    const getserviceDetails = (id) => {
        setservice(rows.find(item=> item.id === id));
    }
    const handleEditClick = (id) => {
        setIsNew(false);
        getserviceDetails(id);
    };
    console.log(rows);
    console.log(service);


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
                                    <NetworkCheck /> Service List
                                    </h5>

                                    <div className="d-flex justify-content-end button-group mb-4">
                                        <HeaderTableButton
                                            isUpdated={isUpdated}
                                            addButton="#serviceModal"
                                            typeAddButton="service"
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
                                            type="service"
                                            sortModel={sortModel}
                                            setSortModel={setSortModel}
                                            isUpdated={isUpdated}
                                            handleEditClick={handleEditClick}
                                            targetModal="#serviceModal"
                                            deleteById={handleDeleteClick}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <ServiceForm
                // user={props.auth.user.username}
                getservice={fetchservicesData}
                isNew={isNew}
                service={service}

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

export default ServicePage;
