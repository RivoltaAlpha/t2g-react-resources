# TanStack Form with TypeScript - Teaching Guide

## Lesson Overview
This lesson covers form handling and validation in React applications using TanStack Form (formerly React Form) with TypeScript. Students will learn modern form management techniques including validation, error handling, and user experience best practices.

## Prerequisites
- React fundamentals (components, hooks, state)
- TypeScript basics (types, interfaces)
- Understanding of controlled components
- Basic form handling concepts

## Learning Objectives
By the end of this lesson, students will be able to:
- Set up and configure TanStack Form in a TypeScript project
- Create type-safe forms with proper validation
- Implement custom validation logic
- Handle form submission with async operations
- Provide real-time user feedback
- Build reusable form components

## Why TanStack Form?

### Problems with Traditional Form Handling
- **Boilerplate Code**: Managing form state manually requires lots of useState calls
- **Validation Complexity**: Hard to implement field-level and form-level validation
- **Performance Issues**: Unnecessary re-renders on every keystroke
- **Type Safety**: Difficult to maintain type safety across form fields
- **User Experience**: Complex to implement features like touched fields, dirty state, etc.

### TanStack Form Benefits
- ✅ Minimal re-renders (only affected fields update)
- ✅ Built-in validation with custom rules
- ✅ TypeScript first with excellent type inference
- ✅ Framework agnostic (can be used with React, Vue, Solid, etc.)
- ✅ Small bundle size
- ✅ Field-level and form-level validation
- ✅ Async validation support
- ✅ Tracks field state (touched, dirty, errors)

## Installation

```bash
npm install @tanstack/react-form
# For validation schemas (optional)
npm install zod
```

## Core Concepts

### 1. Form Instance
The `useForm` hook creates a form instance that manages all form state and behavior.

```typescript
import { useForm } from '@tanstack/react-form';

const form = useForm({
  defaultValues: {
    email: '',
    password: '',
  },
  onSubmit: async ({ value }) => {
    // Handle form submission
    console.log(value);
  },
});
```

### 2. Field Component
Each form field is created using `form.Field` with its own validation and state.

```typescript
<form.Field
  name="email"
  validators={{
    onChange: ({ value }) => {
      if (!value) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Invalid email format';
      }
      return undefined;
    },
  }}
>
  {(field) => (
    <input
      value={field.state.value}
      onChange={(e) => field.handleChange(e.target.value)}
      onBlur={field.handleBlur}
    />
  )}
</form.Field>
```

### 3. Validation Types

#### onChange Validation
Runs as the user types (can be debounced).

```typescript
validators={{
  onChange: ({ value }) => {
    return value.length < 3 ? 'Must be at least 3 characters' : undefined;
  },
}}
```

#### onBlur Validation
Runs when the field loses focus.

```typescript
validators={{
  onBlur: ({ value }) => {
    return !value ? 'This field is required' : undefined;
  },
}}
```

#### onSubmit Validation
Runs only when the form is submitted.

```typescript
validators={{
  onSubmit: ({ value }) => {
    return value !== confirmPassword ? 'Passwords must match' : undefined;
  },
}}
```

#### Async Validation
For server-side validation (checking username availability, etc.).

```typescript
validators={{
  onChangeAsync: async ({ value }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return value === 'taken' ? 'Username already taken' : undefined;
  },
}}
```

### 4. Field State
Each field maintains its own state accessible via `field.state`:

```typescript
field.state.value      // Current value
field.state.meta.errors // Array of error messages
field.state.meta.isTouched // Has the field been focused?
field.state.meta.isDirty   // Has the value changed?
field.state.meta.isValidating // Is async validation running?
```

### 5. Form Submission

```typescript
<form
  onSubmit={(e) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  }}
>
  {/* form fields */}
</form>
```

## TypeScript Patterns

### Type-Safe Form Values

```typescript
interface LoginFormData {
  email: string;
  password: string;
}

const form = useForm<LoginFormData>({
  defaultValues: {
    email: '',
    password: '',
  },
  onSubmit: async ({ value }) => {
    // value is properly typed as LoginFormData
    console.log(value.email, value.password);
  },
});
```

### Validation Function Types

```typescript
type ValidationFn = (value: string) => string | undefined;

const emailValidator: ValidationFn = (value) => {
  if (!value) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return 'Invalid email format';
  }
  return undefined;
};
```

## Best Practices

### 1. Separate Validation Logic
```typescript
// validators.ts
export const validators = {
  email: {
    required: (value: string) => !value ? 'Email is required' : undefined,
    format: (value: string) => 
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) 
        ? 'Invalid email' 
        : undefined,
  },
  password: {
    minLength: (value: string) => 
      value.length < 8 
        ? 'Password must be at least 8 characters' 
        : undefined,
  },
};
```

### 2. Reusable Form Components
```typescript
interface FormFieldProps {
  field: FieldApi<any, any, any, any>;
  label: string;
  type?: string;
  placeholder?: string;
}

function FormField({ field, label, type = 'text', placeholder }: FormFieldProps) {
  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        placeholder={placeholder}
      />
      {field.state.meta.errors && (
        <span className="error">{field.state.meta.errors[0]}</span>
      )}
    </div>
  );
}
```

### 3. Show Errors Conditionally
Only show errors after the field has been touched or on submit attempt.

```typescript
{field.state.meta.isTouched && field.state.meta.errors && (
  <span className="error">{field.state.meta.errors[0]}</span>
)}
```

### 4. Disable Submit Button During Validation
```typescript
<button 
  type="submit"
  disabled={form.state.isSubmitting || !form.state.isValid}
>
  {form.state.isSubmitting ? 'Submitting...' : 'Submit'}
</button>
```

## Common Patterns

### Password Confirmation
```typescript
<form.Field
  name="confirmPassword"
  validators={{
    onChangeListenTo: ['password'],
    onChange: ({ value, fieldApi }) => {
      const password = fieldApi.form.getFieldValue('password');
      return value !== password ? 'Passwords must match' : undefined;
    },
  }}
>
  {/* render field */}
</form.Field>
```

### Dependent Fields
```typescript
<form.Field
  name="country"
  validators={{
    onChange: ({ value }) => !value ? 'Country is required' : undefined,
  }}
>
  {(countryField) => (
    <>
      <select
        value={countryField.state.value}
        onChange={(e) => {
          countryField.handleChange(e.target.value);
          // Reset dependent field
          form.setFieldValue('state', '');
        }}
      >
        {/* options */}
      </select>
    </>
  )}
</form.Field>
```

### Dynamic Form Fields
```typescript
const [fields, setFields] = useState(['']);

const addField = () => setFields([...fields, '']);

fields.map((_, index) => (
  <form.Field
    key={index}
    name={`items[${index}]`}
  >
    {/* render field */}
  </form.Field>
));
```

## Integration with KenyanTea Project

### Use Cases
1. **User Registration**: Create account with email verification
2. **User Login**: Authenticate users
3. **Blog Comment Form**: Add comments to blog posts
4. **Contact Form**: Already exists, can be enhanced with TanStack Form
5. **Newsletter Subscription**: Collect emails with validation

### Implementation Strategy
1. Create a `forms` directory in your project
2. Add `LoginForm.tsx` and `RegisterForm.tsx` components
3. Create a `validators.ts` file for reusable validation functions
4. Add authentication context for managing user state
5. Integrate forms into your routing structure

## Practical Exercise: Enhance KenyanTea

### Task 1: Add Authentication
- Create Login and Register pages
- Add protected routes for authenticated users
- Store auth state in context/localStorage
- Redirect after successful login

### Task 2: Add User Features
- Allow logged-in users to save favorite blogs
- Add a user dashboard
- Implement profile editing form

### Task 3: Newsletter Subscription
- Add a newsletter signup form in the footer
- Validate email on blur
- Show success message on submission

## Common Pitfalls

1. **Not preventing default form submission**
   ```typescript
   // Wrong
   <form onSubmit={form.handleSubmit}>
   
   // Correct
   <form onSubmit={(e) => {
     e.preventDefault();
     form.handleSubmit();
   }}>
   ```

2. **Showing errors too early**
   - Always check `isTouched` before showing errors
   - Consider using `onBlur` validation for better UX

3. **Not handling async errors**
   ```typescript
   onSubmit: async ({ value }) => {
     try {
       await api.login(value);
     } catch (error) {
       // Handle and display error
     }
   }
   ```

4. **Forgetting to reset form**
   ```typescript
   onSubmit: async ({ value }) => {
     await submitData(value);
     form.reset(); // Clear form after successful submission
   }
   ```

## Advanced Topics

### Form-Level Validation
```typescript
const form = useForm({
  validators: {
    onSubmit: ({ value }) => {
      // Validate entire form
      if (value.password !== value.confirmPassword) {
        return {
          form: 'Passwords do not match',
          fields: {
            confirmPassword: 'Passwords must match',
          },
        };
      }
      return undefined;
    },
  },
});
```

### Integration with Zod
```typescript
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
});

validators={{
  onChange: ({ value }) => {
    const result = schema.shape.email.safeParse(value);
    return result.success ? undefined : result.error.issues[0].message;
  },
}}
```

## Assessment Ideas

1. Build a multi-step registration form
2. Create a blog post creation form with image upload
3. Implement a search form with filters
4. Build a user profile edit form with async validation
5. Create a dynamic form that adds/removes fields

## Resources

- [TanStack Form Documentation](https://tanstack.com/form/latest)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Form Validation Best Practices](https://www.smashingmagazine.com/2022/09/inline-validation-web-forms-ux/)

## Quick Reference

### Form Setup
```typescript
const form = useForm({
  defaultValues: { /* ... */ },
  onSubmit: async ({ value }) => { /* ... */ },
});
```

### Field Definition
```typescript
<form.Field
  name="fieldName"
  validators={{
    onChange: ({ value }) => { /* validation */ },
  }}
>
  {(field) => (
    <input
      value={field.state.value}
      onChange={(e) => field.handleChange(e.target.value)}
    />
  )}
</form.Field>
```

### Error Display
```typescript
{field.state.meta.isTouched && field.state.meta.errors && (
  <span>{field.state.meta.errors[0]}</span>
)}
```

---

## Next Steps

After mastering TanStack Form, students should explore:
- Form state management with Zustand/Redux
- Server-side validation
- File upload handling
- Multi-step forms with progress tracking
- Form accessibility (ARIA labels, keyboard navigation)