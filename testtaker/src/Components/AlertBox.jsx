import React from 'react'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AlertBox() {
  return (
    <div className={``}>
        <div className={`flex justify-center items-center`}>
            <ToastContainer/>
        </div>
    </div>
  )
}

export default AlertBox;

