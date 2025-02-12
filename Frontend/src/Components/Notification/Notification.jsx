import React from 'react'
import axios from "axios";

export const Notification = () => {

function sendSMS() {
    const options = {
      method: "POST",
      url: "https://www.fast2sms.com/dev/bulkV2",
      headers: {
        authorization: "2h89FM3ylkb7ilK7PF2CGRhEXhhoiztnMRC7gJrRISUhIJYu9SlWV7R83PkY", // Paste API key here
        // 2h89FM3ylkb7ilK7PF2CGRhEXhhoiztnMRC7gJrRISUhIJYu9SlWV7R83PkY
        "Content-Type": "application/json",
      },
      data: {
        route: "v3",
        sender_id: "TXTIND",
        message: "This is your reminder!",
        language: "english",
        numbers: "9345857852", // Replace with the recipient's phone number
      },
    };
  
    axios
      .request(options)
      .then(() => alert("SMS Sent Successfully!"))
      .catch((error) => console.error("Error sending SMS:", error));
  }
  return (
    <button onClick={sendSMS}>Send SMS Reminder</button>
  )
}
