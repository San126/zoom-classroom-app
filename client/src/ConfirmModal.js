import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

//demo login page not active
const ConfirmModal = () => {


    return (
        <div class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Confirm</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Schedule meet?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary">Ok</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;