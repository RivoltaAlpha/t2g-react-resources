interface User {
  user: {
    user_id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
    created_at: string;
  };
}

export const UserCard = ({ user }: User) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div>
            <h3 className="font-semibold text-lg">{user.name}</h3>
            <span className="text-xs px-2 py-2">{user.role}</span>
          </div>
        </div>
      </div>
      <div className="space-y-2 text-sm text-gray-900">
        <p>{user.email}</p>
        <p>{user.phone}</p>
        <p>Joined: {user.created_at}</p>
      </div>
    </div>
  );
};
