import { AlertCircle, CheckCircle, Coffee, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from '@tanstack/react-form';
import { InputField, validators } from "../Components/InputField";
import { useAuth } from "../Components/auth";

export default function RegisterForm() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
    onSubmit: async ({ value }) => {
      setError(null);
      try {
        await register(value.name, value.email, value.password);
        setSuccess(true);
        setTimeout(() => navigate('/dashboard'), 2000);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Registration failed');
      }
    },
  });

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
          <p className="text-gray-600">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-3xl font-bold text-amber-900 mb-2">
            <Coffee className="w-10 h-10" />
            <span>KenyanTea</span>
          </Link>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">Create Account</h2>
          <p className="text-gray-600 mt-2">Join our tea-loving community</p>
        </div>

        {/* Register Form */}
        <div className="bg-white rounded-xl shadow-xl p-8">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-800 font-semibold">Registration Failed</p>
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
            {/* Name Field */}
            <form.Field
              name="name"
              validators={{
                onChange: ({ value }) => {
                  return validators.name.required(value) || validators.name.minLength(value);
                },
              }}
            >
              {(field) => (
                <InputField
                  field={field}
                  label="Full Name"
                  type="text"
                  placeholder="John Doe"
                  icon={<User className="w-5 h-5" />}
                />
              )}
            </form.Field>

            {/* Email Field */}
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) => {
                  return validators.email.required(value) || validators.email.format(value);
                },
                onChangeAsync: async ({ value }) => {
                  // Simulate checking if email exists
                  if (!value) return undefined;
                  await new Promise((resolve) => setTimeout(resolve, 500));
                  return value === 'existing@kenyantea.com'
                    ? 'This email is already registered'
                    : undefined;
                },
              }}
            >
              {(field) => (
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="your.email@example.com"
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        field.state.meta.isTouched && field.state.meta.errors.length > 0
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }`}
                    />
                    {field.state.meta.isValidating && (
                      <div className="absolute right-3 top-3">
                        <div className="w-5 h-5 border-2 border-amber-900 border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
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

            {/* Password Field */}
            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) => {
                  return (
                    validators.password.required(value) ||
                    validators.password.minLength(value) ||
                    validators.password.hasUpperCase(value) ||
                    validators.password.hasNumber(value)
                  );
                },
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
                      placeholder="Create a strong password"
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
                  {/* Password Strength Indicator */}
                  {field.state.value && (
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <div className={`w-2 h-2 rounded-full ${field.state.value.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`} />
                        <span className={field.state.value.length >= 8 ? 'text-green-700' : 'text-gray-500'}>
                          At least 8 characters
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className={`w-2 h-2 rounded-full ${/[A-Z]/.test(field.state.value) ? 'bg-green-500' : 'bg-gray-300'}`} />
                        <span className={/[A-Z]/.test(field.state.value) ? 'text-green-700' : 'text-gray-500'}>
                          One uppercase letter
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className={`w-2 h-2 rounded-full ${/[0-9]/.test(field.state.value) ? 'bg-green-500' : 'bg-gray-300'}`} />
                        <span className={/[0-9]/.test(field.state.value) ? 'text-green-700' : 'text-gray-500'}>
                          One number
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </form.Field>

            {/* Confirm Password Field */}
            <form.Field
              name="confirmPassword"
              validators={{
                onChangeListenTo: ['password'],
                onChange: ({ value, fieldApi }) => {
                  if (!value) return 'Please confirm your password';
                  const password = fieldApi.form.getFieldValue('password');
                  return value !== password ? 'Passwords do not match' : undefined;
                },
              }}
            >
              {(field) => (
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="Confirm your password"
                      className={`w-full pl-10 pr-12 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        field.state.meta.isTouched && field.state.meta.errors.length > 0
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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

            {/* Terms and Conditions */}
            <form.Field
              name="agreeToTerms"
              validators={{
                onChange: ({ value }) => !value ? 'You must agree to the terms and conditions' : undefined,
              }}
            >
              {(field) => (
                <div className="mb-6">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={field.state.value}
                      onChange={(e) => field.handleChange(e.target.checked)}
                      className="w-4 h-4 text-amber-900 border-gray-300 rounded focus:ring-amber-500 mt-1"
                    />
                    <span className="text-sm text-gray-700">
                      I agree to the{' '}
                      <button type="button" className="text-amber-900 hover:text-amber-700 font-semibold">
                        Terms and Conditions
                      </button>{' '}
                      and{' '}
                      <button type="button" className="text-amber-900 hover:text-amber-700 font-semibold">
                        Privacy Policy
                      </button>
                    </span>
                  </label>
                  {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{field.state.meta.errors[0]}</span>
                    </div>
                  )}
                </div>
              )}
            </form.Field>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={form.state.isSubmitting || !form.state.canSubmit}
              className="w-full bg-amber-900 text-white py-3 rounded-lg font-semibold hover:bg-amber-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {form.state.isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-amber-900 font-semibold hover:text-amber-700">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
