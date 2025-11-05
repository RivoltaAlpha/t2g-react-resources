import { CalendarCheck, MapPin } from "lucide-react";

interface Event_props {
  event: {
    event_id: number;
    event_name: string;
    event_description: string;
    event_date: string;
    event_location: string;
  };
  creatorName: string;
}

export const Eventcard = ({ event, creatorName }: Event_props) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="bg-linear-to-r from-indigo-500 to-purple-600 h-32 flex items-center justify-center">
        <CalendarCheck className="w-16 h-16 text- white" />
      </div>
      <div>
        <h3 className="font-semibold text-lg">{event.event_name}</h3>
        <p className="text-xs px-2 py-2">{event.event_description}</p>
      </div>
      <div className="flex items-center space-x-2">
        <CalendarCheck className="w-16 h-16 text- white" />
        <span>{event.event_date}</span>
      </div>
      <div className="flex items-center space-x-2">
        <MapPin className="w-16 h-16 text- white" />
        <span>{event.event_location}</span>
      </div>
      <p>Event By: {creatorName}</p>
    </div>
  );
};
