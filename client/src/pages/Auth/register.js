import React, { useState } from 'react'
import Layout from '../../components/Layouts/Layout'
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import toast from 'react-hot-toast';
import axios from 'axios';

// CSS
import "../../Styles/AuthStyle.css";


const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    //form function
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            //passing form data to server 8080
            const res = await axios.post('/api/v1/auth/register',
                { name, email, password, phone, address })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/login");//navigate to login page after success registration

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
        <Layout title={"Register-ecommerce"}>
            <div className='form-container'>

                <h1>Register Page</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            id="InputName"
                            placeholder='Enter your Name '
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control"
                            id="InputPhone"
                            placeholder='Enter your phone '
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="form-control"
                            id="InputAddress"
                            placeholder='Enter your Address '
                            required
                        />
                    </div>
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

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
        </Layout>
    )
}

export default Register