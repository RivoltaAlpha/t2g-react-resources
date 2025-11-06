import { Check } from "lucide-react";
import type { User } from "../types/types";

export const UserCard = ({user,onSelect,isSelected,}: {user: User; onSelect: (userId: number) => void; isSelected: boolean;}) => {
  const handleClick = () => onSelect(user.id);

  const handleDoubleClick = () => {
    alert(`User Email: ${user.email}`);
  };

  return (
    <div
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      className={`border rounded-lg p-4 cursor-pointer transition-all ${
        isSelected ? "border-blue-500 bg-blue-50" : "hover:shadow-md"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-lg">{user.name}</h3>
        {isSelected && <Check className="text-blue-500" size={20} />}
      </div>
      <p className="text-sm text-gray-600 mb-1">{user.email}</p>
      <div className="flex justify-between items-center mt-3">
        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
          {user.role}
        </span>
        <span className="text-xs text-gray-500">
          {user.eventsAttended} events
        </span>
      </div>
    </div>
  );
};
