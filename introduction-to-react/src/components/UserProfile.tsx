const users = [
  {
    "user_id": 49,
    "name": "Admin test",
    "email": "testadmin@gmail.com",
    "role": "Admin"
  },
  {
    "user_id": 50,
    "name": "Ben Jakes",
    "email": "test2@gmail.com",
    "role": "user"
  },
  {
    "user_id": 51,
    "name": "JJ Jakes",
    "email": "test24@gmail.com",
    "role": "user"
  }
]

export interface UserProfileProps {
    user_id?: number;
    name: string;
    email: string;
    role: string;
}

function UserProfile () {
    return (
        <div>
            <h1>Users</h1>
            {users.map((user) => (
                <div key={user.user_id}>
                    <h2>User ID: {user.user_id}</h2>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role}</p>
                </div>
            ))}
        </div>
    );
}

export default UserProfile;