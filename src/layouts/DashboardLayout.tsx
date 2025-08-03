import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <Outlet />
        </div>
    )
}

export default DashboardLayout
