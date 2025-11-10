import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { registrationAPI } from '../features/Auth/RegistrationAPI';
// Define a type for the form data
type FormData = {
    first_name: string;
    last_name: string;
    username: string;
    contact_phone: string;
    email: string;
    address: string;
    password: string;
};

export default function Register() {
    const [formData, setFormData] = useState<FormData>({
        first_name: '',
        last_name: '',
        username: '',
        contact_phone: '',
        email: '',
        address: '',
        password: ''
    });

    const navigate = useNavigate();
    const [registerUser, { isLoading, isError, error }] = registrationAPI.useRegisterUserMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting form data:", formData); // Debugging step

        try {
            const response = await registerUser(formData).unwrap();
            console.log("Backend response:", response); // Debugging step
            // Registration successful, navigate to login page
            toast.success('User registered successfully');
            navigate('/login');
        } catch (err) {
            console.error('Error registering user:', err);
            toast.error('Error registering user');
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Toaster 
                toastOptions={{
                    classNames: {
                        error: 'bg-red-400',
                        success: 'text-green-400',
                        warning: 'text-yellow-400',
                        info: 'bg-blue-400',
                    },
                }}
            />
            <div className="flex flex-col lg:flex-row items-center max-w-6xl w-full space-y-8 lg:space-y-0 lg:space-x-8">
                <div className="lg:w-3/4 lg:mr-11 w-full">
                    <img src= "https://imgs.search.brave.com/BoIKLVNFU64tUXfMcz6cn_F9rnmdHhRz7NEgFjiahF8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG5p/Lmljb25zY291dC5j/b20vaWxsdXN0cmF0/aW9uL3ByZW1pdW0v/dGh1bWIvZXZlbnQt/bWFuYWdlbWVudC1z/ZXJ2aWNlLWlsbHVz/dHJhdGlvbi1zdmct/ZG93bmxvYWQtcG5n/LTQ2OTMzMzEucG5n"
                     alt="Register" className="w-full h-auto object-cover" />
                </div>
                <div className="lg:w-1/2 w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-4xl font-bold text-gray-900">
                            Create your account
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm space-y-4">
                            {(['first_name', 'last_name', 'username', 'contact_phone', 'email', 'address', 'password'] as const).map((field) => (
                                <div key={field}>
                                    <input
                                        name={field}
                                        type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                                        required
                                        className="appearance-none rounded relative w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder={field.replace('_', ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
                                        value={formData[field]}
                                        onChange={handleChange}
                                    />
                                </div>
                            ))}
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-1/4 lg:ml-[150px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Registering...' : 'Register'}
                            </button>
                        </div>
                        {isError && <p className="text-red-500 text-sm">{(error as any)?.data?.message || 'Error registering user'}</p>}
                    </form>
                    <div className="text-center">
                        <p className="mt-2 text-sm text-gray-600">
                            Already have an account?{' '}
                            <NavLink to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Log in
                            </NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}