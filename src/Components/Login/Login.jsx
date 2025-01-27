import React from 'react';
import { Link } from 'react-router-dom';
const Input = ({ id, label, type, autoComplete }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-white">
            {label}
        </label>
        <div className="mt-1">
            <input
                id={id}
                name={id}
                type={type}
                autoComplete={autoComplete}
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
        </div>
    </div>
);

const LoginPage = () => {

     const[formData, setFormData] = React.useState({
            email: '',
            password: '',
            confirmPassword: ''
        });
    
        const handleChange = (e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
    
            try {
                const response = await fetch('http://localhost:5000/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
    
                const result = await response.json();
    
                if (response.ok) {
                    alert('Login successful');
                    localStorage.setItem('token', result.token);
                    navigate('/meshcraft');
                } else {
                    alert(result.message || 'Login failed');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        };
    
        
    return (
    <div className="min-h-screen bg-black flex flex-col justify-center pb-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="text-center text-3xl font-bold text-white">Login</h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ml-5 mr-5">
            <div className="bg-gray-900 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
                <Input id="email" label="Email address" type="email" autoComplete="email" value={formData.email} onChange={handleChange} />
                <Input id="password" label="Password" type="password" autoComplete="current-password" value={formData.password} onChange={handleChange} />
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-offset-5 focus:ring-gray-500"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <div className="text-sm text-center text-white mt-4">
                    <p>
                        Don't have an account?{' '}
                        <Link to="/register" className="font-bold text-gray-400 hover:text-gray-500">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    </div>
)};

export default LoginPage;