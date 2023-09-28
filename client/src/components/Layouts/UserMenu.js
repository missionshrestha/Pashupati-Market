import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
    return (
        <>
            <div className="text-center">
                <div className="list-group">
                    <h4>User Dashboard</h4>
                    <NavLink
                        to="/dashboard/user/profile" className="list-group-item list-group-item-action">User Profile
                    </NavLink>
                    <NavLink
                        to="/dashboard/user/orders" className="list-group-item list-group-item-action">User Orders
                    </NavLink>
                </div>
            </div>



        </>
    )
}

export default UserMenu