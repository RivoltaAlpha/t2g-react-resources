import { useForm } from "@tanstack/react-form";

export default function App() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    onSubmit: async ({ value }) => {
      // Handle form submission
      console.log(value);
    },
  });

  return (
    <>
      <div className="max-w-6xl bg-white mx-auto p-4 ">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-col shadow-lg bg-gray-100 rounded-lg p-20 "
        >
          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "A first name is required"
                  : value.length < 3
                  ? "First name must be at least 3 characters"
                  : undefined,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return (
                  value.includes("error") && 'No "error" allowed in first name'
                );
              },
            }}
            children={(field) => (
              <input
                className="mb-4 p-2 border border-gray-300 rounded"
                value={field.state.value}
                onChange={(e) => field.setValue(e.target.value)}
                placeholder="Name"
              />
            )}
          />
          <form.Field
            name="email"
            children={(field) => (
              <input
                className="mb-4 p-2 border border-gray-300 rounded"
                value={field.state.value}
                onChange={(e) => field.setValue(e.target.value)}
                placeholder="Email"
              />
            )}
          />
          <form.Field
            name="message"
            children={(field) => (
              <input
                className="mb-4 p-2 border border-gray-300 rounded"
                value={field.state.value}
                onChange={(e) => field.setValue(e.target.value)}
                placeholder="Message"
              />
            )}
          />

          <form.Subscribe
            selector={(state) => ({
              canSubmit: state.canSubmit,
              isSubmitting: state.isSubmitting,
            })}
            children={({ canSubmit, isSubmitting }) => (
              <button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Send Message"}
              </button>
            )}
          />
        </form>
      </div>
    </>
  );
}
