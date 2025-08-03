import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '../pages/auth/LoginPage'
import Products from '../pages/products/Products'
import DashboardLayout from '../layouts/DashboardLayout'
import NotFound from '../components/errors/NotFound'

const router = createBrowserRouter([
    {
        path: '/',
        element: <LoginPage />,
    },
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <Products />,
            },
            {
                path: 'products',
                element: <Products />,
            },
        ],
    },
    {
        path: '*',
        element: <NotFound />,
    },
])

export default router
