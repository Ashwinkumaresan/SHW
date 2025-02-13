import React, { useState } from "react";
import axios from "axios";

export const Notification = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const sendSms = async (e) => {
        e.preventDefault();
        setResponse(null);
        setError(null);

        try {
            const payload = {
                message: message,
                language: "english",
                route: "q", // "q" or "p" (check Fast2SMS docs)
                numbers: phoneNumber,
            };

            console.log("Sending data:", payload);  // Debugging

            const res = await axios.post("http://127.0.0.1:8000/send-sms/", payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log("Response:", res.data);
            setResponse(res.data);
        } catch (err) {
            setError("Error sending SMS. Check console for details.");
            console.error("Request Error:", err.response?.data || err);
        }
    };

    return (
        <div>
            <h2>Send SMS</h2>
            <form onSubmit={sendSms}>
                <label>Phone Number:</label>
                <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />

                <label>Message:</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />

                <button type="submit">Send</button>
            </form>

            {response && <p className="success">SMS Sent: {JSON.stringify(response)}</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

