const registrations = [
    {
        reg_id: 1,
        user_id: 1,
        event_id: 1,
        reg_status: "confirmed",
        registration_date: "2024-07-01",
        payment_amount: 500.00        
    },
    {
        reg_id: 2,
        user_id: 2,
        event_id: 1,
        reg_status: "pending",
        registration_date: "2024-07-02",
        payment_amount: 500.00
    },
    {
        reg_id: 3,
        user_id: 3,
        event_id: 3,
        reg_status: "confirmed",
        registration_date: "2024-07-03",
        payment_amount: 300.00
    }
]

const Registrations = () => {
    return (
        <div>
            <h1>Registrations</h1>
            {registrations.map((reg) => (
                <div key={reg.reg_id}>
                    <h2>Registration ID: {reg.reg_id}</h2>
                    <p>User ID: {reg.user_id}</p>
                    <p>Event ID: {reg.event_id}</p>
                    <p>Status: {reg.reg_status}</p>
                    <p>Date: {reg.registration_date}</p>
                    <p>Payment: ${reg.payment_amount.toFixed(2)}</p>
                </div>
            ))}
        </div>
    );
}

export default Registrations;