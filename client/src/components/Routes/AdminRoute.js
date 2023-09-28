import { useState, useEffect } from "react";
import { useAuth } from '../../context/auth.js';
import { Outlet } from 'react-router-dom';
import axios from "axios";
import Spinner from "../Spinner.js";

const AdminRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth()

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get('/api/v1/auth/admin-auth',
               /* equivalent code in   auth.js
               {
                    headers: {
                        "Authorization": auth?.token
                    }
                } */
            )
            //in authRoute.js we have defined requireSignIn
            if (res.data.ok) {
                setOk(true)
            }
            else {
                setOk(false)
            }

        }

        //uf there is token in auth variable we doubled check if signin or not in authCheck()
        if (auth?.token) {
            authCheck()
        }
    }, [auth?.token])

    //if ok or signed In, show outlet
    return ok ? <Outlet /> : <Spinner path=''/>
}

export default AdminRoute;