
import LoginForm from '../../components/auth/LoginForm';
import { useLogin } from './hooks/useLogin';


const LoginPage: React.FC = () => {
    const { login, loading, error } = useLogin();
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4 flex-col">
            <LoginForm onLogin={login} loading={loading} error={error || undefined} />

            {/* login credentials*/}
            <div className="mt-8 text-center text-sm text-black">
                <p className="mb-2">Demo credentials:</p>
                <div className="bg-gray-100 border border-black rounded-md p-3 inline-block">
                    <p className="font-medium">Email: admin@example.com</p>
                    <p className="font-medium">Password: admin123</p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;