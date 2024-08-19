import { Close } from "@mui/icons-material";
import { Button, InputAdornment, TextField } from "@mui/material";
import axios from "axios";

import React, { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
// import ConfirmModal from "../ConfirmModal";
import Loading from "../Loading";

const ServiceForm = (props) => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    // const [phoneNumber, setPhoneNumber] = useState("");
    // const [instagramAccount, setInstagramAccount] = useState("");
    const [formData, setFormData] = useState({});

    const [isLoading, setIsLoading] = useState(false);


    const initialState = props.isNew
        ? { name: ""}
        : {
            name: props.service?.name,
          };
    useEffect(() => {
        setFormData(initialState);

    }, [props.isNew, props.service]);

    const resetField = () => {
        // setName("");
        // setAddress("");
        // setEmail("");
        // setPhoneNumber("");
        // setInstagramAccount("");
        setFormData(initialState);

    };
    const saveservice = async () => {
        try {
            const params = {
                // name: name,
                // email: email,
                // address: address,
                // phoneNumber: phoneNumber,
                // instagram: instagramAccount,
                // createdBy: props.user,
                ...formData
            };
            const response = await axios.post("/add_product", params);
            resetField();
            Swal.fire({
                icon: "success",
                title: response.data.message,
                timer: 1500,
            });
            props.getservice();
        } catch (error) {
            Swal.fire({
                title: "Oops",
                text: error.response.data,
                icon: "error",
                timer: 1500,
            });
        }
    };
    const updateserviceData = async () => {
        const params = {
            // name: name,
            // email: email,
            // address: address,
            // phoneNumber: phoneNumber,
            // instagram: instagramAccount,
            // createdBy: props.user,
            id: props.service.id,
            ...formData
        };
        try {
            const response = await axios.put("/update_product", params);
            Swal.fire({
                icon: "success",
                title: response.data.message,
                timer: 1500,
            });
            props.getservice();
            // setIsUpdated(false);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops",
                text: error.response.data,
                timer: 1500,
            });
            // setIsUpdated(true);
        }
    };
    

    const handleSubmit = async () => {
        setIsLoading(true);
        props.isNew?await saveservice():await updateserviceData();
        setIsLoading(false);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    console.log(formData)
    return (
        <>
            <Loading isLoading={isLoading} />
            <div
                class="modal fade"
                id="serviceModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                            {props.isNew?"Add":"Update"} Service
                            </h5>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                                {/* <Close /> */}
                            </button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col">
                                            <TextField
                                                id="outlined-basic"
                                                label={
                                                    <span>
                                                        Service Name
                                                        <span className="text-danger">
                                                            *
                                                        </span>
                                                    </span>
                                                }
                                                variant="outlined"
                                                className="w-100 mb-3"
                                                value={formData.name}
                                                name="name"
                                                onChange={(e) =>
                                                    handleChange(e)
                                                }
                                            />
                                        </div>
                                        {/* <div className="col">
                                            <TextField
                                                id="outlined-basic"
                                                label={
                                                    <span>
                                                        Email
                                                        <span className="text-danger">
                                                            *
                                                        </span>
                                                    </span>
                                                }
                                                variant="outlined"
                                                className="w-100 mb-3"
                                                value={formData.email}
                                                name="email"
                                                onChange={(e) =>
                                                   handleChange(e)
                                                }
                                            />
                                        </div> */}
                                        {/* <div className="col col-lg-6 col-md-4 col-sm-2">
                                            <TextField
                                                id="outlined-basic"
                                                label="Instagram Account"
                                                variant="outlined"
                                                className="w-100"
                                                value={instagramAccount}
                                                onChange={(e) =>
                                                    setInstagramAccount(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div> */}
                                    </div>
                                    {/* <div className="row"> */}
                                    {/* <div className="col col-lg-6 col-md-4 col-sm-2">
                                            <TextField
                                                id="outlined-basic"
                                                label={
                                                    <span>
                                                        Phone Number
                                                        <span className="text-danger">
                                                            *
                                                        </span>
                                                    </span>
                                                }
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            +62
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                variant="outlined"
                                                className="w-100 mb-4"
                                                value={phoneNumber}
                                                onChange={(e) =>
                                                    setPhoneNumber(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div> */}

                                    {/* </div> */}
                                    {/* <div className="row">
                                        <div className="col col-lg-12">
                                            <TextField
                                                id="outlined-textarea"
                                                label={
                                                    <span>
                                                        Address
                                                        <span className="text-danger">
                                                            *
                                                        </span>
                                                    </span>
                                                }
                                                className="w-100"
                                                multiline
                                                name="address"
                                                value={formData.address}
                                                onChange={(e) =>
                                                   handleChange(e)
                                                }
                                            />
                                        </div>
                                    </div> */}
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            {/* <Button
                                variant="contained"
                                data-bs-dismiss="modal"
                                color="secondary"
                                sx={{ marginRight: "10px" }}
                            >
                                Cancel
                            </Button> */}
                            <Button
                                variant="contained"
                                color="error"
                                data-bs-dismiss="modal"
                                sx={{ marginRight: "10px" }}
                                onClick={() => resetField()}
                            >
                                Discard
                            </Button>
                            <Button
                                variant="contained"
                                // data-bs-toggle="modal"
                                // data-bs-target="#saveModal"
                                data-bs-dismiss="modal"
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <ConfirmModal
                id="saveModal"
                type="submit"
                text="Are you sure want to save?"
                handleClick={handleSubmit}
            /> */}
        </>
    );
};

export default ServiceForm;
