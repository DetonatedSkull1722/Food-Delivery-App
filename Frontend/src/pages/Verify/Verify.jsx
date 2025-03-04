import React, { useEffect } from 'react'
import './verify.css'
import { useNavigate, useSearchParams } from 'react-router'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const Verify = () => {
    const [searchParams, setserchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderid');
    const { url } = useContext(StoreContext);

    const navigate = useNavigate();

    const verifyPayment = async () => {
        const response = await axios.post(url + "/api/order/verify", { success, orderId });
        if (response.data.success) {
            navigate('/myorders');
        }
        else {
            navigate('/');
        }
    }

    useEffect(() => {
        verifyPayment();
    }, [])

    console.log(success, orderId);
    return (
        <div className='verify'>
            <div className="spinner"></div>
        </div>
    )
}

export default Verify
