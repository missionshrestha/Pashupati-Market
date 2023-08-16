import React from 'react'
import Layout from '../../components/Layouts/Layout'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import toast from 'react-hot-toast';
import axios from 'axios';

// CSS
import "../../Styles/AuthStyle.css";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();


    //form function
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            //passing form data to server 8080
            const res = await axios.post('/api/v1/auth/forgot-password',
                { email, newPassword, answer})
            if (res.data.success) {
                toast.success(res.data.message)

              
                navigate("/login");

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
        <Layout title={"Forgot Password"}>
            <div className='form-container'>

                <h1>Reset Password </h1>
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
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control"
                            id="InputPassword"
                            placeholder='Enter your Password '
                            required
                        />

                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control"
                            id="InputAnswer"
                            placeholder='Enter your secret answer '
                            required
                        />

                    </div>
              
                    <button type="submit" className="btn btn-primary">Reset</button>
                </form>

            </div>
        </Layout>
    )
}

export default ForgotPassword