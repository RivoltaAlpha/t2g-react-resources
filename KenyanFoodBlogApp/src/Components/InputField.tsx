import { AlertCircle } from "lucide-react";

const validators = {
  email: {
    required: (value: string) => !value ? 'Email is required' : undefined,
    format: (value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !emailRegex.test(value) ? 'Please enter a valid email' : undefined;
    },
  },
  password: {
    required: (value: string) => !value ? 'Password is required' : undefined,
    minLength: (value: string) => 
      value.length < 8 ? 'Password must be at least 8 characters' : undefined,
    hasUpperCase: (value: string) =>
      !/[A-Z]/.test(value) ? 'Password must contain at least one uppercase letter' : undefined,
    hasNumber: (value: string) =>
      !/[0-9]/.test(value) ? 'Password must contain at least one number' : undefined,
  },
  name: {
    required: (value: string) => !value ? 'Name is required' : undefined,
    minLength: (value: string) =>
      value.length < 2 ? 'Name must be at least 2 characters' : undefined,
  },
};

// Reusable Input Component
interface InputFieldProps {
  field: any;
  label: string;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
}

function InputField({ field, label, type = 'text', placeholder, icon }: InputFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-semibold mb-2">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-3 text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          placeholder={placeholder}
          className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
            field.state.meta.isTouched && field.state.meta.errors.length > 0
              ? 'border-red-500'
              : 'border-gray-300'
          }`}
        />
      </div>
      {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
        <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{field.state.meta.errors[0]}</span>
        </div>
      )}
    </div>
  );
}

export { InputField, validators };