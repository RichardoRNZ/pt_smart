import { MenuProps } from "@/Config/SelectProps";
import { Close } from "@mui/icons-material";
import {
    Button,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
} from "@mui/material";
import axios from "axios";

import React, { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
// import ConfirmModal from "../ConfirmModal";
import Loading from "../Loading";

const projectForm = (props) => {
    const [customer, setCustomer] = useState([]);
    const [services, setServices] = useState([]);
    const [email, setEmail] = useState("");
    // const [phoneNumber, setPhoneNumber] = useState("");
    // const [instagramAccount, setInstagramAccount] = useState("");
    const [formData, setFormData] = useState({});

    const [isLoading, setIsLoading] = useState(false);

    const initialState = props.isNew
        ? { customer_id :"", product_id :"",}
        : {
            customer_id :props.project.customer_id, product_id :props.project.product_id
          };
    useEffect(() => {
        setFormData(initialState);
        fetchCustomersData();
        fetchservicesData();
    }, [props.isNew, props.project]);

    const resetField = () => {
        setFormData(initialState);
    };
    const saveproject = async () => {
        try {
            const params = {
                ...formData,
            };
            const response = await axios.post("/add_subscription", params);
            resetField();
            Swal.fire({
                icon: "success",
                title: response.data.message,
                timer: 1500,
            });
            props.getproject();
        } catch (error) {
            Swal.fire({
                title: "Oops",
                text: error.response.data,
                icon: "error",
                timer: 1500,
            });
        }
    };
    const updateprojectData = async () => {
        const params = {

            id: props.project.id,
            ...formData,
        };
        try {
            const response = await axios.put("update_subscription", params);
            Swal.fire({
                icon: "success",
                title: response.data.message,
                timer: 1500,
            });
            props.getproject();
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
    const fetchCustomersData = async () => {
        try {
            ;
            const response = await axios.get("/customer/all/data");
            setCustomer(response.data);
            // setRowCount(response.data.total);
        } catch (error) {
            // setHasError(true);
            setTimeout(() => {
                throw error;
            });
        } finally {

        }
    };
    const fetchservicesData = async () => {
        try {
            // setIsLoading(true);
            const response = await axios.get("/product/data");
            setServices(response.data);
            // setRowCount(response.data.total);
        } catch (error) {
            // setHasError(true);
            setTimeout(() => {
                throw error;
            });
        } finally {
            // setIsLoading(false);
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        props.isNew ? await saveproject() : await updateprojectData();
        setIsLoading(false);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    console.log(formData);
    console.log(customer);

    return (
        <>
            <Loading isLoading={isLoading} />
            <div
                class="modal fade"
                id="projectModal"
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
                                {props.isNew ? "Add" : "Update"} project
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
                                            <FormControl
                                                sx={{ m: 1, width: 300 }}
                                            >
                                                <InputLabel id="demo-multiple-name-label">
                                                    <span>
                                                        Customer Name
                                                        <span className="text-danger">
                                                            *
                                                        </span>
                                                    </span>
                                                </InputLabel>
                                                <Select
                                                    labelId="demo-multiple-name-label"
                                                    id="demo-multiple-name"
                                                    name="customer_id"
                                                    // multiple
                                                    value={formData.customer_id}
                                                    onChange={(e) =>
                                                        handleChange(e)
                                                    }

                                                    input={
                                                        <OutlinedInput label="Customer Name*" />
                                                    }
                                                    MenuProps={MenuProps}
                                                >
                                                    {customer.map(
                                                        (customer) => (
                                                            <MenuItem
                                                                key={
                                                                    customer.id
                                                                }
                                                                value={
                                                                    customer.id
                                                                }
                                                            >
                                                                {customer.name}
                                                            </MenuItem>
                                                        )
                                                    )}
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div className="col">
                                            <FormControl
                                                sx={{ m: 1, width: 300 }}
                                            >
                                                <InputLabel id="demo-multiple-name-label">
                                                    <span>
                                                        Service
                                                        <span className="text-danger">
                                                            *
                                                        </span>
                                                    </span>
                                                </InputLabel>
                                                <Select
                                                    labelId="demo-multiple-name-label"
                                                    id="demo-multiple-name"
                                                    name="product_id"
                                                    // multiple
                                                    value={formData.product_id}
                                                    onChange={(e) =>
                                                        handleChange(e)
                                                    }
                                                    input={
                                                        <OutlinedInput label="Service*" />
                                                    }
                                                    MenuProps={MenuProps}
                                                >
                                                    {services.map(
                                                        (service) => (
                                                            <MenuItem
                                                                key={
                                                                    service.id
                                                                }
                                                                value={
                                                                    service.id
                                                                }
                                                            >
                                                                {service.name}
                                                            </MenuItem>
                                                        )
                                                    )}
                                                </Select>
                                            </FormControl>
                                        </div>
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

export default projectForm;
