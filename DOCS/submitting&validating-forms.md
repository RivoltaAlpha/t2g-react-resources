# Complete Guide: Forms in React with TanStack Forms & TypeScript

## Table of Contents
1. [Introduction](#introduction)
2. [Why TanStack Forms?](#why-tanstack-forms)
3. [Setup & Installation](#setup--installation)
4. [Basic Concepts](#basic-concepts)
5. [Building Your First Form](#building-your-first-form)
6. [Validation Strategies](#validation-strategies)
7. [Advanced Patterns](#advanced-patterns)
8. [Best Practices](#best-practices)

---

## Introduction

Form handling is one of the most common tasks in web development, but it can quickly become complex. This guide will teach you how to build robust, type-safe forms using **TanStack Form** (formerly React Form) with **TypeScript** and **React**.

### What You'll Learn
- How to set up and configure TanStack Forms
- Managing form state effectively
- Implementing validation (sync and async)
- Handling form submission
- TypeScript integration for type safety
- Real-world patterns and best practices

---

## Why TanStack Forms?

### Problems with Traditional Form Handling
```tsx
// Traditional approach - lots of boilerplate
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [errors, setErrors] = useState({});

const handleNameChange = (e) => setName(e.target.value);
const handleEmailChange = (e) => setEmail(e.target.value);
// ... and so on
```

### TanStack Forms Advantages
- ✅ **Less boilerplate** - Manage all fields in one place
- ✅ **Built-in validation** - Sync and async validation support
- ✅ **TypeScript first** - Full type safety
- ✅ **Performance** - Only re-renders what changes
- ✅ **Flexible** - Works with any UI library
- ✅ **Small bundle size** - Lightweight solution

---

## Setup & Installation

### 1. Install Dependencies
```bash
pnpm add @tanstack/react-form
```

### 2. Optional: Add Validation Library
For schema-based validation, you can use Zod:
```bash
npm install @tanstack/zod-form-adapter zod
```
---

## Basic Concepts

### Core Components

#### 1. **useForm Hook**
The main hook that creates and manages your form instance.

```tsx
import { useForm } from '@tanstack/react-form';

const form = useForm({
  defaultValues: {
    name: '',
    email: ''
  },
  onSubmit: async (values) => {
    console.log(values);
  }
});
```

#### 2. **form.Field Component**
Connects individual inputs to the form state.

```tsx
<form.Field
  name="email"
  children={(field) => (
    <input
      value={field.state.value}
      onChange={(e) => field.handleChange(e.target.value)}
    />
  )}
/>
```

#### 3. **Form State**
Access form-level state like errors, submission status, etc.

```tsx
const isSubmitting = form.useStore((state) => state.isSubmitting);
```

---

## Building Your First Form

### Example: Basic Contact Form

Let's build a complete contact form from scratch:

```tsx
import React from 'react';
import { useForm } from '@tanstack/react-form';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const form = useForm<ContactFormData>({
    defaultValues: {
      name: '',
      email: '',
      message: ''
    },
    onSubmit: async ({ value }) => {
      // Simulate API call
      console.log('Submitting:', value);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Form submitted successfully!');
    }
  });

  return (
    <div className="form-container">
      <h2>Contact Us</h2>
      
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
          children={(field) => (
            <div className="field-group">
              <label htmlFor="name">Name *</label>
              <input
                id="name"
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Enter your name"
              />
              {field.state.meta.errors.length > 0 && (
                <span className="error">
                  {field.state.meta.errors[0]}
                </span>
              )}
            </div>
          )}
        />

        {/* Email Field */}
        <form.Field
          name="email"
          children={(field) => (
            <div className="field-group">
              <label htmlFor="email">Email *</label>
              <input
                id="email"
                type="email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Enter your email"
              />
              {field.state.meta.errors.length > 0 && (
                <span className="error">
                  {field.state.meta.errors[0]}
                </span>
              )}
            </div>
          )}
        />

        {/* Message Field */}
        <form.Field
          name="message"
          children={(field) => (
            <div className="field-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Enter your message"
                rows={4}
              />
              {field.state.meta.errors.length > 0 && (
                <span className="error">
                  {field.state.meta.errors[0]}
                </span>
              )}
            </div>
          )}
        />

        {/* Submit Button */}
        <form.Subscribe
          selector={(state) => ({
            canSubmit: state.canSubmit,
            isSubmitting: state.isSubmitting
          })}
          children={({ canSubmit, isSubmitting }) => (
            <button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="submit-button"
            >
              {isSubmitting ? 'Submitting...' : 'Send Message'}
            </button>
          )}
        />
      </form>
    </div>
  );
}
```

---

## Validation Strategies

### 1. Field-Level Validation

Validate individual fields as users interact with them:

```tsx
<form.Field
  name="email"
  validators={{
    onChange: ({ value }) => {
      if (!value) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Please enter a valid email address';
      }
      return undefined;
    },
    onBlur: ({ value }) => {
      // Additional validation on blur
      if (value.length < 5) return 'Email seems too short';
      return undefined;
    }
  }}
  children={(field) => (
    <div className="field-group">
      <label>Email</label>
      <input
        type="email"
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        className={field.state.meta.errors.length > 0 ? 'error' : ''}
      />
      {field.state.meta.errors.map((error, index) => (
        <span key={index} className="error">{error}</span>
      ))}
    </div>
  )}
/>
```

### 2. Form-Level Validation

Validate the entire form before submission:

```tsx
const form = useForm({
  defaultValues: {
    password: '',
    confirmPassword: ''
  },
  validators: {
    onSubmit: ({ value }) => {
      if (value.password !== value.confirmPassword) {
        return {
          form: 'Passwords do not match',
          fields: {
            confirmPassword: 'Must match password'
          }
        };
      }
      return undefined;
    }
  },
  onSubmit: async ({ value }) => {
    console.log('Form is valid:', value);
  }
});
```

### 3. Async Validation

For validations that require server calls (like checking username availability):

```tsx
<form.Field
  name="username"
  validators={{
    onChangeAsync: async ({ value }) => {
      if (!value) return 'Username is required';
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if username exists
      const existingUsers = ['admin', 'user', 'test'];
      if (existingUsers.includes(value.toLowerCase())) {
        return 'Username is already taken';
      }
      
      return undefined;
    }
  }}
  children={(field) => (
    <div className="field-group">
      <label>Username</label>
      <input
        type="text"
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      {field.state.meta.isValidating && (
        <span className="validating">Checking availability...</span>
      )}
      {field.state.meta.errors.length > 0 && (
        <span className="error">{field.state.meta.errors[0]}</span>
      )}
    </div>
  )}
/>
```

### 4. Schema Validation with Zod

For complex validation logic, use Zod schemas:

```tsx
import { zodValidator } from '@tanstack/zod-form-adapter';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z.string()
    .email('Please enter a valid email address'),
  age: z.number()
    .min(13, 'Must be at least 13 years old')
    .max(120, 'Please enter a valid age'),
  terms: z.boolean()
    .refine(val => val === true, 'You must accept the terms')
});

const form = useForm({
  defaultValues: {
    name: '',
    email: '',
    age: 0,
    terms: false
  },
  validatorAdapter: zodValidator,
  validators: {
    onChange: userSchema
  },
  onSubmit: async ({ value }) => {
    console.log('Valid data:', value);
  }
});
```

---

## Form Submission Handling

### 1. Basic Submission

```tsx
const form = useForm({
  defaultValues: { /* ... */ },
  onSubmit: async ({ value, formApi }) => {
    try {
      // Show loading state
      console.log('Submitting:', value);
      
      // Make API call
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value)
      });
      
      if (!response.ok) {
        throw new Error('Submission failed');
      }
      
      // Handle success
      alert('Form submitted successfully!');
      formApi.reset(); // Reset form after successful submission
      
    } catch (error) {
      // Handle errors
      console.error('Submission error:', error);
      // You can set form-level errors here
      formApi.setErrorMap({
        onSubmit: 'Failed to submit form. Please try again.'
      });
    }
  }
});
```

### 2. Handling Different Response Types

```tsx
const handleSubmit = async ({ value, formApi }) => {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value)
    });
    
    const result = await response.json();
    
    if (response.ok) {
      // Success
      console.log('User created:', result);
      formApi.reset();
    } else {
      // Server validation errors
      if (result.fieldErrors) {
        // Set field-specific errors
        formApi.setFieldMeta('email', (prev) => ({
          ...prev,
          errors: [result.fieldErrors.email]
        }));
      } else {
        // General error
        formApi.setErrorMap({
          onSubmit: result.message || 'Submission failed'
        });
      }
    }
  } catch (error) {
    // Network or other errors
    formApi.setErrorMap({
      onSubmit: 'Network error. Please check your connection.'
    });
  }
};
```

### 3. Multi-Step Form Submission

```tsx
const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  
  const form = useForm({
    defaultValues: {
      // Step 1
      personalInfo: { name: '', email: '' },
      // Step 2
      preferences: { newsletter: false, notifications: true },
      // Step 3
      additional: { comments: '' }
    },
    onSubmit: async ({ value }) => {
      // Submit all steps at once
      console.log('Final submission:', value);
      await submitToServer(value);
    }
  });
  
  const handleNextStep = async () => {
    // Validate current step before proceeding
    const isValid = await form.validateAllFields('change');
    if (isValid) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      if (currentStep === 3) {
        form.handleSubmit();
      } else {
        handleNextStep();
      }
    }}>
      {currentStep === 1 && <PersonalInfoStep form={form} />}
      {currentStep === 2 && <PreferencesStep form={form} />}
      {currentStep === 3 && <AdditionalStep form={form} />}
      
      <div className="form-navigation">
        {currentStep > 1 && (
          <button type="button" onClick={() => setCurrentStep(prev => prev - 1)}>
            Previous
          </button>
        )}
        <button type="submit">
          {currentStep === 3 ? 'Submit' : 'Next'}
        </button>
      </div>
    </form>
  );
};
```

---

## Advanced Patterns

### 1. Dynamic Forms

Create forms that change based on user input:

```tsx
const DynamicForm = () => {
  const form = useForm({
    defaultValues: {
      userType: 'individual',
      individual: { name: '', email: '' },
      business: { companyName: '', taxId: '' }
    }
  });
  
  return (
    <form>
      <form.Field
        name="userType"
        children={(field) => (
          <select
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
          >
            <option value="individual">Individual</option>
            <option value="business">Business</option>
          </select>
        )}
      />
      
      <form.Subscribe
        selector={(state) => state.values.userType}
        children={(userType) => (
          <>
            {userType === 'individual' && (
              <div>
                <form.Field
                  name="individual.name"
                  children={(field) => (
                    <input
                      placeholder="Full Name"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  )}
                />
              </div>
            )}
            
            {userType === 'business' && (
              <div>
                <form.Field
                  name="business.companyName"
                  children={(field) => (
                    <input
                      placeholder="Company Name"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  )}
                />
              </div>
            )}
          </>
        )}
      />
    </form>
  );
};
```

### 2. Custom Field Components

Create reusable field components:

```tsx
interface TextFieldProps {
  form: any;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  form,
  name,
  label,
  type = 'text',
  placeholder,
  required = false
}) => {
  return (
    <form.Field
      name={name}
      validators={{
        onChange: required 
          ? ({ value }) => !value ? `${label} is required` : undefined
          : undefined
      }}
      children={(field) => (
        <div className="field-group">
          <label htmlFor={name}>
            {label} {required && <span className="required">*</span>}
          </label>
          <input
            id={name}
            type={type}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            placeholder={placeholder}
            className={field.state.meta.errors.length > 0 ? 'error' : ''}
          />
          {field.state.meta.errors.map((error, index) => (
            <span key={index} className="error">{error}</span>
          ))}
        </div>
      )}
    />
  );
};

// Usage
<TextField
  form={form}
  name="email"
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  required
/>
```

### 3. Form Arrays (Dynamic Lists)

Handle dynamic lists of items:

```tsx
const TaskForm = () => {
  const form = useForm({
    defaultValues: {
      tasks: [{ title: '', completed: false }]
    }
  });
  
  return (
    <form>
      <form.Field
        name="tasks"
        mode="array"
        children={(field) => (
          <div>
            <h3>Tasks</h3>
            {field.state.value.map((_, i) => (
              <div key={i} className="task-item">
                <form.Field
                  name={`tasks.${i}.title`}
                  children={(subField) => (
                    <input
                      value={subField.state.value}
                      onChange={(e) => subField.handleChange(e.target.value)}
                      placeholder="Task title"
                    />
                  )}
                />
                
                <form.Field
                  name={`tasks.${i}.completed`}
                  children={(subField) => (
                    <input
                      type="checkbox"
                      checked={subField.state.value}
                      onChange={(e) => subField.handleChange(e.target.checked)}
                    />
                  )}
                />
                
                <button
                  type="button"
                  onClick={() => field.removeValue(i)}
                >
                  Remove
                </button>
              </div>
            ))}
            
            <button
              type="button"
              onClick={() => field.pushValue({ title: '', completed: false })}
            >
              Add Task
            </button>
          </div>
        )}
      />
    </form>
  );
};
```

---

## Best Practices

### 1. **Type Safety First**
Always define your form data interface:

```tsx
interface UserFormData {
  name: string;
  email: string;
  age: number;
  preferences: {
    newsletter: boolean;
    notifications: boolean;
  };
}

const form = useForm<UserFormData>({
  // TypeScript will ensure your defaultValues match the interface
  defaultValues: {
    name: '',
    email: '',
    age: 0,
    preferences: {
      newsletter: false,
      notifications: true
    }
  }
});
```

### 2. **Separate Validation Logic**
Keep validation functions separate and reusable:

```tsx
// validators.ts
export const validateEmail = (email: string) => {
  if (!email) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Please enter a valid email address';
  }
  return undefined;
};

export const validatePassword = (password: string) => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return 'Password must contain uppercase, lowercase, and number';
  }
  return undefined;
};

// In your component
<form.Field
  name="email"
  validators={{ onChange: ({ value }) => validateEmail(value) }}
  // ...
/>
```

### 3. **Handle Loading States**
Always provide feedback during form submission:

```tsx
<form.Subscribe
  selector={(state) => ({
    canSubmit: state.canSubmit,
    isSubmitting: state.isSubmitting,
    errors: state.errors
  })}
  children={({ canSubmit, isSubmitting, errors }) => (
    <div>
      <button
        type="submit"
        disabled={!canSubmit || isSubmitting}
        className={`submit-button ${isSubmitting ? 'loading' : ''}`}
      >
        {isSubmitting ? (
          <>
            <span className="spinner"></span>
            Submitting...
          </>
        ) : (
          'Submit Form'
        )}
      </button>
      
      {errors.onSubmit && (
        <div className="form-error">
          {errors.onSubmit}
        </div>
      )}
    </div>
  )}
/>
```

### 4. **Accessibility Considerations**
Make your forms accessible:

```tsx
<form.Field
  name="email"
  children={(field) => (
    <div className="field-group">
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        type="email"
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-describedby={field.state.meta.errors.length > 0 ? 'email-error' : undefined}
        aria-invalid={field.state.meta.errors.length > 0}
      />
      {field.state.meta.errors.length > 0 && (
        <div id="email-error" role="alert" className="error">
          {field.state.meta.errors[0]}
        </div>
      )}
    </div>
  )}
/>
```

### 5. **Error Boundary for Forms**
Wrap forms in error boundaries:

```tsx
class FormErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="form-error-boundary">
          <h3>Something went wrong with the form</h3>
          <button onClick={() => this.setState({ hasError: false })}>
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
<FormErrorBoundary>
  <ContactForm />
</FormErrorBoundary>
```

---

## Common Patterns & Solutions

### 1. **Debounced Validation**
For expensive validations (like API calls):

```tsx
import { useCallback } from 'react';
import { debounce } from 'lodash';

const debouncedEmailCheck = useCallback(
  debounce(async (email: string) => {
    const response = await fetch(`/api/check-email?email=${email}`);
    const data = await response.json();
    return data.exists ? 'Email already exists' : undefined;
  }, 500),
  []
);

<form.Field
  name="email"
  validators={{
    onChangeAsync: async ({ value }) => {
      if (!validateEmail(value)) return validateEmail(value);
      return await debouncedEmailCheck(value);
    }
  }}
  children={(field) => (
    // ... field render
  )}
/>
```

### 2. **Conditional Field Requirements**
Make fields required based on other field values:

```tsx
<form.Field
  name="phoneNumber"
  validators={{
    onChange: ({ value, fieldApi }) => {
      const formValues = fieldApi.form.getState().values;
      const contactMethod = formValues.contactMethod;
      
      if (contactMethod === 'phone' && !value) {
        return 'Phone number is required when phone contact is selected';
      }
      return undefined;
    }
  }}
  children={(field) => (
    // ... field render
  )}
/>
```

### 3. **File Upload Handling**
Handle file uploads with validation:

```tsx
<form.Field
  name="profileImage"
  validators={{
    onChange: ({ value }) => {
      if (!value) return undefined;
      
      const file = value as File;
      if (file.size > 5 * 1024 * 1024) { // 5MB
        return 'File size must be less than 5MB';
      }
      
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        return 'Only JPEG, PNG, and GIF files are allowed';
      }
      
      return undefined;
    }
  }}
  children={(field) => (
    <div className="field-group">
      <label htmlFor="profileImage">Profile Image</label>
      <input
        id="profileImage"
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          field.handleChange(file || null);
        }}
      />
      {field.state.meta.errors.length > 0 && (
        <span className="error">{field.state.meta.errors[0]}</span>
      )}
    </div>
  )}
/>
```

---

## Troubleshooting Guide

### Common Issues and Solutions

#### 1. **Form Not Submitting**
```tsx
// ❌ Wrong - missing preventDefault
<form onSubmit={form.handleSubmit}>

// ✅ Correct
<form onSubmit={(e) => {
  e.preventDefault();
  e.stopPropagation();
  form.handleSubmit();
}}>
```

#### 2. **TypeScript Errors with Field Names**
```tsx
// ❌ Wrong - TypeScript can't infer the path
<form.Field name="user.address.street" />

// ✅ Correct - Use proper typing
interface FormData {
  user: {
    address: {
      street: string;
    };
  };
}

const form = useForm<FormData>({...});
<form.Field name="user.address.street" />
```

#### 3. **Validation Not Triggering**
```tsx
// ❌ Wrong - validation function not returning properly
validators={{
  onChange: ({ value }) => {
    if (!value) {
      console.log('Value is required'); // This won't show as error
    }
  }
}}

// ✅ Correct - return the error message
validators={{
  onChange: ({ value }) => {
    if (!value) return 'Value is required';
    return undefined;
  }
}}
```

#### 4. **Performance Issues**
```tsx
// ❌ Wrong - component recreated on every render
<form.Field
  name="email"
  children={(field) => <EmailInput field={field} />}
/>

// ✅ Correct - use callback to prevent recreation
const renderEmailField = useCallback((field) => (
  <EmailInput field={field} />
), []);

<form.Field name="email" children={renderEmailField} />
```

---

## Resources & Next Steps

### 🔗 Useful Links
- [TanStack Form Documentation](https://tanstack.com/form/latest)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zod Documentation](https://zod.dev/)
- [React Hook Form Migration Guide](https://tanstack.com/form/latest/docs/framework/react/guides/migrating-from-react-hook-form)

### 📚 Additional Learning
1. **Advanced Validation**: Explore cross-field validation and custom validators
2. **Performance Optimization**: Learn about field isolation and selective subscriptions
3. **Testing**: Write unit tests for your forms using React Testing Library
4. **Integration**: Connect with state management libraries (Redux, Zustand)

### 🛠️ Practice Projects
1. **User Registration Form**: Multi-step form with email verification
2. **Survey Builder**: Dynamic form generation based on JSON schema
3. **E-commerce Checkout**: Complex form with multiple payment methods
4. **Blog Content Manager**: Rich text editor integration with form validation

---

## Conclusion

TanStack Forms provides a powerful, type-safe way to handle forms in React applications. By following the patterns and best practices outlined in this guide, you'll be able to build robust, user-friendly forms that scale with your application needs.

Remember the key principles:
- **Start simple** and add complexity as needed
- **Type everything** for better developer experience
- **Validate early and often** to provide good user feedback
- **Handle loading states** to keep users informed
- **Make it accessible** for all users

Happy form building! 🚀

---

*This guide covers TanStack Form v0.26.0 and above. Check the official documentation for the latest updates and features.*