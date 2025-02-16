import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

//demo login page not active
const ConfirmModal = () => {


    return (
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Confirm</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <p>Schedule meet?</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary">Ok</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;