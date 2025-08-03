import React from 'react'
import Sidebar from '../Components/Global/Sidebar.jsx'
import { Outlet } from 'react-router-dom'
import GlassLayout from './Glass.jsx'

const Admin = () => {
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, }}>
               <GlassLayout>
                    <Sidebar>
                        <Outlet />
                    </Sidebar>
               </GlassLayout>
            </div>
        </div>
    )
}

export default Admin