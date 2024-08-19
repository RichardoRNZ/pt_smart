import React from "react";

const DetailServices = (props) => {
    console.log(props)
    return (
        <div>
            <div
                class="modal fade"
                id="detailModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog modal-dialog-centered modal-center modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                Detail Services
                            </h5>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-body">
                            <ul class="list-group">
                                {props.service?.map((item) =>{
                                    return (
                                        <li class="list-group-item">{item.serviceName}</li>
                                    )
                                })}

                            </ul>
                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            {/* <button type="button" class="btn btn-primary">
                                Save changes
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailServices;
