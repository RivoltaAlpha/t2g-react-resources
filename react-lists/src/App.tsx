import { useState } from "react";
import "./App.css";
import { mockData } from "./data";
import { UserCard } from "./components/UserCard";
import { Eventcard } from "./components/EventCard";
import { RegistrationCard } from "./components/RegCard";
import { FeedbackCard } from "./components/FeedbackCard";

function App() {
  const users = mockData.users;
  const events = mockData.events;
  const feedbacks = mockData.feedbacks;
  const registrations = mockData.registrations;
  const [activeTab, setactiveTab] = useState("users");

  const getUserName = (user_id: number) => {
    const user = users.find((u) => u.user_id === user_id);
    return user ? user.name : "Unknown User";
  };

  const getEventName = (event_id: number) => {
    const event = events.find((e) => e.event_id === event_id);
    return event ? event.event_name : "Unknown Event";
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-8xl mx-auto">
        {/* header */}
        <div className="mb-8 texts-center">
          <h1>Event Management System</h1>
          <p>Learning React Lists with Map & Keys</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md p-2 mb-2 flex space-x-4">
          {["users", "events", "registrations", "feedbacks"].map((tab) => (
            <button
              key={tab}
              onClick={() => setactiveTab(tab)}
              className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors
            ${
              activeTab === tab
                ? "bg-indigo-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            >
              {tab.charAt(0).toLocaleUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === "users" &&
            users.map((user) => <UserCard key={user.user_id} user={user} />)}

          {activeTab === "events" &&
            events.map((event) => (
              <Eventcard
                key={event.event_id}
                event={event}
                creatorName={getUserName(event.created_by)}
              />
            ))}

          {activeTab === "registrations" &&
            registrations.map((registration) => (
              <RegistrationCard
                key={registration.registration_id}
                registration={registration}
                userName={getUserName(registration.user_id)}
                EventName={getEventName(registration.event_id)}
              />
            ))}

          {activeTab === "feedbacks" && feedbacks.map((feedback) => (
            <FeedbackCard 
            key={feedback.feedback_id}
            feedback={feedback}
            username={getUserName(feedback.user_id)}
            eventname={getEventName(feedback.event_id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
