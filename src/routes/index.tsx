import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <LoginPage />,
    },
    {
        path: '*',
        element: <LoginPage />,
    },
]);

export default router;