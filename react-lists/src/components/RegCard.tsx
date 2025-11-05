interface RegProps {
    registration:{
        registration_id: number;
        registration_date: string;
        payment_status: string;
        payment_amount: number;
    }
    userName:string;
    EventName:string;
}

export const RegistrationCard = ({registration, userName, EventName}: RegProps) => {
    const statusColor  = registration.payment_status === "completed"
     ? "bg-green-100 text-green-600" 
     : "bg-yellow-100 text-yellow-600";

    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-lg">{EventName}</h3>
            <p className="text-sm text-gray-500">Registered by: {userName}</p>
            <div className="mt-4">
                <p className="text-sm">Registration ID: {registration.registration_id}</p>
                <p className="text-sm">Date: {registration.registration_date}</p>
                <p className={`text-sm ${statusColor}`}>Payment Status: {registration.payment_status}</p>
                <p className="text-sm">Amount: ${registration.payment_amount}</p>
            </div>
        </div>
    );
};