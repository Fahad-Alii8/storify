import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
    return (
        <div className="flex">
            <Outlet />
        </div>
    )
}

export default DashboardLayout
