import React from 'react'
import Layout from '../components/Layouts/Layout'

const Policy = () => {
    return (
        <Layout title={"Privacy Policy"}>
            <div className="row contactus ">
                <div className="col-md-6 ">
                    <img
                        src="/images/contactus.jpeg"
                        alt="contactus"
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="col-md-4">
                    <p>privacy policy1</p>
                    <p>privacy policy2</p>
                    <p>privacy policy3</p>
                    <p>privacy policy4</p>
                    <p>privacy policy5</p>
                    <p>privacy policy6</p>
                    <p>privacy policy7</p>
                </div>
            </div>
        </Layout>
    )
}

export default Policy