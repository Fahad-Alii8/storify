
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import type { LoginFormData } from '../../interfaces/auth.interfaces';
import { validateLoginForm } from '../../validation/auth.validation';

interface LoginFormProps {
    onLogin: (formData: LoginFormData) => void;
    loading: boolean;
    error?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, loading }) => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState<Partial<LoginFormData>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validation = validateLoginForm(formData);

        if (!validation.valid) {
            setErrors(validation.errors);
            return;
        }

        setErrors({});
        onLogin(formData);
    };

    return (
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg  shadow-sm border border-gray-200">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Welcome Back 👋</h2>
                <p className="mt-2 text-sm text-gray-500">Login to your admin dashboard to manage your products</p>
            </div>




            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-black">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className={`mt-1 appearance-none block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black sm:text-sm bg-white text-black`}
                            placeholder="you@example.com"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-black">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className={`mt-1 appearance-none block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black sm:text-sm bg-white text-black`}
                            placeholder="••••••••"
                        />
                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-black focus:ring-black border-black rounded accent-black"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-black">
                            Remember me
                        </label>
                    </div>

                    <div className="text-sm">
                        <a href="#" className="font-medium text-black hover:text-gray-600 underline">
                            Forgot your password?
                        </a>
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full flex justify-center py-2 px-4 border border-black text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                Signing in...
                            </>
                        ) : 'Sign in'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;