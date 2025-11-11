import { AlertCircle, Coffee, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from '@tanstack/react-form';
import { InputField, validators } from "../Components/InputField";
import { useAuth } from "../Components/auth";

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    onSubmit: async ({ value }) => {
      setError(null);
      try {
        await login(value.email, value.password);
        navigate('/dashboard');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Login failed');
      }
    },
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 to-amber-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-3xl font-bold text-amber-900 mb-2">
            <Coffee className="w-10 h-10" />
            <span>KenyanTea</span>
          </Link>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-xl p-8">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-red-800 font-semibold">Login Failed</p>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            {/* Email Field */}
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) => {
                  return validators.email.required(value) || validators.email.format(value);
                },
              }}
            >
              {(field) => (
                <InputField
                  field={field}
                  label="Email Address"
                  type="email"
                  placeholder="your.email@example.com"
                  icon={<Mail className="w-5 h-5" />}
                />
              )}
            </form.Field>

            {/* Password Field */}
            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) => validators.password.required(value),
              }}
            >
              {(field) => (
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="Enter your password"
                      className={`w-full pl-10 pr-12 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        field.state.meta.isTouched && field.state.meta.errors.length > 0
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{field.state.meta.errors[0]}</span>
                    </div>
                  )}
                </div>
              )}
            </form.Field>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between mb-6">
              <form.Field name="rememberMe">
                {(field) => (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={field.state.value}
                      onChange={(e) => field.handleChange(e.target.checked)}
                      className="w-4 h-4 text-amber-900 border-gray-300 rounded focus:ring-amber-500"
                    />
                    <span className="text-sm text-gray-700">Remember me</span>
                  </label>
                )}
              </form.Field>
              <button type="button" className="text-sm text-amber-900 hover:text-amber-700 font-semibold">
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={form.state.isSubmitting}
              className="w-full bg-amber-900 text-white py-3 rounded-lg font-semibold hover:bg-amber-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {form.state.isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-sm text-amber-900 font-semibold mb-1">Demo Credentials:</p>
            <p className="text-sm text-amber-800">Email: demo@kenyantea.com</p>
            <p className="text-sm text-amber-800">Password: password123</p>
          </div>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-amber-900 font-semibold hover:text-amber-700">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
