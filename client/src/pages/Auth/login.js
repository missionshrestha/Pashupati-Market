import React, { useState } from 'react'
import Layout from '../../components/Layouts/Layout'
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../../context/auth.js';

// CSS
import "../../Styles/AuthStyle.css";


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();

    //form function
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            //passing form data to server 8080
            const res = await axios.post('/api/v1/auth/login',
                { email, password, })
            if (res.data.success) {
                toast.success(res.data.message)

                //set login data in homepage
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })

                localStorage.setItem('auth', JSON.stringify(res.data))
                navigate("/");//navigate to login page after success registration

            }
            else {
                toast.error(res.data.message)

            }

        } catch (error) {
            toast.error("Something went wrong ")
            console.log(error)
        }
    }


    return (
        <Layout title={"Login-ecommerce"}>
            <div className='form-container'>

                <h1>Login Page</h1>
                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="InputEmail"
                            placeholder='Enter your Email '
                            required

                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="InputPassword"
                            placeholder='Enter your Password '
                            required
                        />

                    </div>

                    <button type="submit" className="btn btn-primary">Login</button>
                </form>

            </div>
        </Layout>
    )
}

export default Login