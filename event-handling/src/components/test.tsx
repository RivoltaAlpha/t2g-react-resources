import type { User } from "../types/types";

export const TestCases = () => {
  const user: User = {
    id: 1,
    name: "Tiff",
    email: "mwaniki@gmail.com",
  };

  const handleClick = () => {
    console.log("Button clicked");
  };

  const handleMouseEnter = () => {
    console.log("Button clicked");
  };

  const handleSubmit = () => {
    console.log("Submission Button clicked");

  };

  return (
    <div>
      <button onClick={handleClick} onMouseEnter={handleMouseEnter}>
        Click Me
      </button>
      <form onSubmit={handleSubmit}>
        <div>
            <input type="number" value={user.id} placeholder="Enter your Id" />
            <input type="text" value={user.name} placeholder="Enter your name" />
            <input type="text" value={user.email} placeholder="Enter your Email" />
            <input type="text" value={user.role} placeholder="Enter your Role" />
        </div>
        <button onClick={() => handleSubmit}>Submit</button>
      </form>
    </div>
  );
};
