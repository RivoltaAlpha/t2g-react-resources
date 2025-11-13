import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { setUserData } from "../features/Auth/UserAuthSlice";
import { useLoginMutation } from "../features/Auth/LoginApi";
import type { LoginRequest } from "../types/types";

export const Login = () => {
  const [user, setUser] = useState<LoginRequest>({
    email: "",
    password: "",
    role: "User",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.userAuth);
  const [loginUser, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev: LoginRequest) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form data:", user); // Debugging step
    try {
      const response = await loginUser(user).unwrap();
      console.log("Backend response:", response); // Debugging step

      // Transform the backend response to match our frontend structure
      const userData = {
        user_id: response.foundUser.user_id,
        name: response.foundUser.email.split('@')[0], // Use email prefix as name
        email: response.foundUser.email,
        phone: "", // Not provided by backend, set empty
        password: "", // Don't store password in frontend
        role: response.foundUser.role,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      dispatch(setUserData({ user: userData, token: response.accessToken }));
      // Display the success message before navigation
      toast.success("Logged in successfully", {
        position: "bottom-center",
      });

      // Navigate to dashboard regardless of role (for now)
      // You can customize routing based on roles later
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Invalid name or password");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row items-center justify-center py-12 px-6 lg:px-8">
      <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-start lg:px-8">
        <img
          className="w-full h-auto object-cover lg:h-full"
          src="https://imgs.search.brave.com/BoIKLVNFU64tUXfMcz6cn_F9rnmdHhRz7NEgFjiahF8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG5p/Lmljb25zY291dC5j/b20vaWxsdXN0cmF0/aW9uL3ByZW1pdW0v/dGh1bWIvZXZlbnQt/bWFuYWdlbWVudC1z/ZXJ2aWNlLWlsbHVz/dHJhdGlvbi1zdmct/ZG93bmxvYWQtcG5n/LTQ2OTMzMzEucG5n"
          alt="Welcome"
        />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full lg:w-[600px]">
          <div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Welcome Back
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  value={user.email}
                  onChange={handleChange}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="rounded w-full mb-5 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                />
              </div>
              <div>
                <input
                  value={user.password}
                  onChange={handleChange}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded relative w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-1/2 lg:ml-[150px] flex justify-center py-2 px-4 border border-black text-sm font-medium rounded-md text-black sm:ml-0 bg-cards hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isLoading ? "Logging in..." : "Login"}
                {/* success toaster */}
              </button>
            </div>
          </form>
          <div className="mt-6">
            <div className="text-center">
              <p className="mt-2 text-sm font-medium gap-10  text-gray-600">
                <div>
                Don't have an account?{" "}
                <NavLink
                  to="/register"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Register
                </NavLink>
                </div>
                <div>
                Admin?{" "}
                <NavLink
                  to="/admin-login"
                  className="font-medium text-indigo-600  hover:text-indigo-500"
                >
                  Login
                </NavLink>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;