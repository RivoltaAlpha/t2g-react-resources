import { useState, type MouseEvent } from "react";
import type { Event } from "../types/types";
import { Calendar, Edit2, MapPin, Trash2, Users } from "lucide-react";

export const EventCard = ({ event, onDelete,onEdit, onStatusChange }: {
  event: Event;
  onDelete: (id: number) => void;
  onEdit: (event: Event) => void;
  onStatusChange: (id: number, status: Event['status']) => void;
}) => {

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (confirm(`Delete "${event.title}"?`)) {
      onDelete(event.id);
    }
  };

  const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onEdit(event);
  };

  const statusColors = {
    upcoming: 'bg-blue-100 text-blue-800',
    ongoing: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800'
  };

  return (
    <div
      className={`border rounded-lg p-4 transition-all ${isHovered ? 'shadow-lg scale-105' : 'shadow'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold">{event.title}</h3>
        <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[event.status]}`}>
          {event.status}
        </span>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span>{new Date(event.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={16} />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users size={16} />
          <span>{event.attendees} attendees</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleEdit}
          className="flex-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center gap-2"
        >
          <Edit2 size={16} />
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center gap-2"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
};