import React, { useEffect } from 'react'
// import { Helmet } from "react-helmet"
import "./Chatbot.css"

export const Chatbot = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "/Chatbot.js"; // File inside `public/`
        script.async = true;
        document.body.appendChild(script);
    
        return () => {
          document.body.removeChild(script);
        };
      }, []);
  return (
    <>

<button id="chatbot_toggler">
        <span><svg class="chatbot_logo" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="#ffffff"  stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-5l-5 3v-3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3zM9.5 9h.01m4.99 0h.01"/><path d="M9.5 13a3.5 3.5 0 0 0 5 0"/></g></svg></span>
        <span><svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 22"><path fill="#fff" d="m12 13.4l-2.917 2.925q-.277.275-.704.275t-.704-.275q-.275-.275-.275-.7t.275-.7L10.6 12L7.675 9.108Q7.4 8.831 7.4 8.404t.275-.704q.275-.275.7-.275t.7.275L12 10.625L14.892 7.7q.277-.275.704-.275t.704.275q.3.3.3.713t-.3.687L13.375 12l2.925 2.917q.275.277.275.704t-.275.704q-.3.3-.712.3t-.688-.3z"/></svg></span>
    </button>
    <div class="chatbot_popup">
        {/* <!-- Chatbot header --> */}
        <div class="chat_header">
            <div class="header_info">
                <svg class="chatbot_logo" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-5l-5 3v-3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3zM9.5 9h.01m4.99 0h.01"/><path d="M9.5 13a3.5 3.5 0 0 0 5 0"/></g></svg>
                <h2 class="text_logo">Chatbot</h2>
            </div>
            <button class="material_symbol_rounded" id="close_chatbot" ><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 40"><path  d="M8.12 9.29L12 13.17l3.88-3.88a.996.996 0 1 1 1.41 1.41l-4.59 4.59a.996.996 0 0 1-1.41 0L6.7 10.7a.996.996 0 0 1 0-1.41c.39-.38 1.03-.39 1.42 0"/></svg></button>
        </div>

        {/* <!-- Chatbot body --> */}
        <div class="chat_body">
            <div class="message bot_message">
                <svg class="bot_avathar" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-5l-5 3v-3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3zM9.5 9h.01m4.99 0h.01"/><path d="M9.5 13a3.5 3.5 0 0 0 5 0"/></g></svg>
                <div class="message_text">Hey there <br/> How can I help you today?</div>
            </div>
            {/* <!-- <div class="message user_message">
                <div class="message_text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, saepe quia. Odio ipsa fugit modi voluptatum placeat quos iusto magni? Eum commodi, nobis est autem alias deserunt expedita natus iste.</div>
            </div>
            <div class="message bot_message thinking">
                <svg class="bot_avathar" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-5l-5 3v-3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3zM9.5 9h.01m4.99 0h.01"/><path d="M9.5 13a3.5 3.5 0 0 0 5 0"/></g></svg>
                <div class="message_text">
                    <div class="thinking_indicator">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>
            </div> --> */}
        </div>

        {/* <!-- Chatbot footer --> */}
         <div class="chat_footer">
            <form action="#" class="chat_form">
                <textarea placeholder="Message..." class="message_input" required></textarea>
                <div class="chat_controls">
                    <button type="button" class="material_symbol_rounded"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><g fill="none" stroke="#1E88E5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="64" stroke-dashoffset="64" d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0"/></path><path stroke-dasharray="2" stroke-dashoffset="2" d="M9 9v1"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="2;0"/></path><path stroke-dasharray="2" stroke-dashoffset="2" d="M15 9v1"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.9s" dur="0.2s" values="2;0"/></path><path stroke-dasharray="12" stroke-dashoffset="12" d="M8 14c0.5 1.5 1.79 3 4 3c2.21 0 3.5 -1.5 4 -3"><animate fill="freeze" attributeName="stroke-dashoffset" begin="1.1s" dur="0.2s" values="12;0"/></path></g></svg></button>
                    <div class="file_upload_wrapper">
                        <input type="file" accept="images/*" id="file_input" hidden/>
                        <img src="#"/>
                        <button type="button" id="file_upload" class="material_symbol_rounded"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="#1E88E5" d="M18 15.75q0 2.6-1.825 4.425T11.75 22t-4.425-1.825T5.5 15.75V6.5q0-1.875 1.313-3.187T10 2t3.188 1.313T14.5 6.5v8.75q0 1.15-.8 1.95t-1.95.8t-1.95-.8t-.8-1.95V7q0-.425.288-.712T10 6t.713.288T11 7v8.25q0 .325.213.538t.537.212t.538-.213t.212-.537V6.5q-.025-1.05-.737-1.775T10 4t-1.775.725T7.5 6.5v9.25q-.025 1.775 1.225 3.013T11.75 20q1.75 0 2.975-1.237T16 15.75V7q0-.425.288-.712T17 6t.713.288T18 7z"/></svg></button>
                        <button type="button" id="file_cancle" class="material_symbol_rounded"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 02 24 24"><path fill="#ff0000" d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg></button>
                    </div>

                    <button type="submit" class="material_symbol_rounded" id="send_message" ><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path d="M11 20V7.825l-5.6 5.6L4 12l8-8l8 8l-1.4 1.425l-5.6-5.6V20z"/></svg></button>
                    
                </div>
            </form>
         </div>
    </div>
    {/* <React.Fragment>
    <script src='./ChatbotJs.js' type='text/javascript'></script>
    </React.Fragment>
    <Helmet>
        
    </Helmet> */}
    </>
  )
}
