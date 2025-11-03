export interface EventProps {
    event_name: string;
    event_date: string;
    event_location: string;
    description: string;
}

function Event (event: EventProps) {
    return (
        <div>
            <h2>{event.event_name}</h2>
            <p>{event.event_date}</p>
            <p>{event.event_location}</p>
            <p>{event.description}</p>
        </div>
    );
}

export default Event;