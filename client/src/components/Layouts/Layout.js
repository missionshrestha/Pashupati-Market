import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
    return (
        <div>
            <Header></Header>
            <main style={{ minHeight: '80vh' }}>


                {children}
            </main>
            <Footer></Footer>

        </div >
    )
}

export default Layout