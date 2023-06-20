import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


const Spinner = () => {
    const [count, setCount] = useState(5)
    const navigate = useNavigate();
    const location = useLocation()
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((preValue) => --preValue)
        }, 1000);
        count === 0 && navigate('/login',//navigate to login when count=0
            { state: location.pathname })
        return () => clearInterval(interval)
    }, [count, navigate, location]);


    return (
        <>
            <div class="d-flex flex-column justify-content-center align-items-center vh-100">
                <h1 className='Text-center'>Redirecting to you in {count} second</h1>
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>


        </>
    )
}

export default Spinner