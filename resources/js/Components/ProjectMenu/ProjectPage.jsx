import React, { useState, useEffect } from "react";
import { Breadcrumbs, Button, Link, TextField, Typography } from "@mui/material";
import { Group, Receipt } from "@mui/icons-material";
// import AddprojectForm from "./AddprojectForm";
import Datatable from "../Datatable";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../Loading";
// import projectForm from "./projectForm";
// import ConfirmModal from "../ConfirmModal";
import HeaderTableButton from "../HeaderTableButton";
import ProjectForm from "./ProjectForm";
// import Product from "../ProductMenu/ProductList";
// import FileSaver from "file-saver";


const ProjectPage = (props) => {
    const columns = [
        { field: "no", headerName: "No", width: 70 },

        {
            field: "customerName",
            headerName: "Customer Name",
            width: 400,

        },
        { field: "serviceName", headerName: "Service Name", width: 400 },



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
    const [project, setproject] = useState("");
    const [selectionModel, setSelectionModel] = useState([]);

    useEffect(() => {
        fetchprojectsData();
    }, [props.ziggy.location, paginationModel, search, sortModel]);

    const fetchprojectsData = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get("/subscribtion/inactive");
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
    const deleteprojectData = async (id) => {
        try {
            const response = await axios.delete("/delete_subscription/" + id);
            Swal.fire({
                icon: "success",
                title: response.data.message,
                timer: 1500,
            });
            fetchprojectsData();
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
        await deleteprojectData(id);
        // setRowId(0);
        setShowLoading(false);
    };
    // const downloadprojectsData = async () => {
    //     try {
    //         const response = await axios.get("/projects/export", {
    //             responseType: "blob",
    //         });
    //         const blob = new Blob([response.data], {
    //             type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    //         });
    //         FileSaver.saveAs(blob, "projects.xlsx");
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
        await updateprojectData();
        setShowLoading(false);
    };
    const handleDiscardChanges = () => {
        fetchprojectsData();
        Swal.fire({
            icon: "success",
            title: "Successfully discard changes",
            timer: 1500,
        });
        setIsUpdated(false);
    };
    const getprojectDetails = (id) => {
        setproject(rows.find(item=> item.id === id));
    }
    const handleEditClick = (id) => {
        setIsNew(false);
        getprojectDetails(id);
    };
    const approveProjects = async (project) => {
        try {
            setShowLoading(true);
            const response = await axios.put("/approve_subscription", {id:selectionModel});
            Swal.fire({
                icon: "success",
                title: response.data.message,
                timer: 1500,
            });
            setShowLoading(false);
        } catch (error) {
            Swal.fire({
                title: "Oops",
                text: error.response.data,
                icon: "error",
                timer: 1500,
            });
            setShowLoading(false);
        }
    };
    console.log(rows);
    console.log(project);
    console.log(props)


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
                                    <Receipt /> Project List
                                    </h5>

                                    <div className="d-flex justify-content-end button-group mb-4">
                                    {props.auth.user.roles==="manager" && (
                                            <Button
                                                variant="contained"
                                                color="success"
                                                sx={{ marginRight: "10px" }}
                                                onClick={() => {
                                                    approveProjects()
                                                }}
                                            >
                                                Approve Project
                                            </Button>
                                        )}
                                        <HeaderTableButton
                                            isUpdated={isUpdated}
                                            addButton="#projectModal"
                                            typeAddButton="project"
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
                                            type="project"
                                            sortModel={sortModel}
                                            setSortModel={setSortModel}
                                            isUpdated={isUpdated}
                                            handleEditClick={handleEditClick}
                                            targetModal="#projectModal"
                                            deleteById={handleDeleteClick}
                                            selectionModel={selectionModel}
                                            setSelectionModel={
                                                setSelectionModel
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <ProjectForm
                // user={props.auth.user.username}
                getproject={fetchprojectsData}
                isNew={isNew}
                project={project}

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

export default ProjectPage;
