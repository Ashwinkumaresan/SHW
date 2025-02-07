const messageInput = document.querySelector(".message_input");
const chatBody = document.querySelector(".chat_body");
const sendMessageButton = document.querySelector("#send_message");
const fileInput = document.querySelector("#file_input");
const fileUploadWrapper = document.querySelector(".file_upload_wrapper");
const fileCancelButton = document.querySelector("#file_cancle");
const chatbotToggler = document.querySelector("#chatbot_toggler");
const closeChatBot = document.querySelector("#close_chatbot");

//API setup
//API key
const API_KEY = "AIzaSyCpaqJPgz6HH_H5-grNR1ShLd2s-aCdVCQ";
// API url
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`; // Here we removed beta from betaV1 in url

const userData = {
    message: null,
    file: {
        data : null,
        mime_type: null,
    }
}

// Store past message for future response
const chatHistory = [] ;
// Adjust message input height dynamically
const intialInputHeight = messageInput.scrollHeight;

// Create message element with dynamic ...classes (... means adding all class to div) and return it
const createMessageElement = (content, ...classes) =>{
    const div = document.createElement("div")
    div.classList.add("message", ...classes)
    div.innerHTML = content;
    return div;
}

// Bot response using API 
const generateBotResponse = async (incomingMessageDiv) =>{
    const messageElement = incomingMessageDiv.querySelector(".message_text");

    // Add user message to chat history
    chatHistory.push({
        role: "user",
        "parts":[{text: userData.message }, ...(userData.file.data ? [{ inline_data: userData.file }] : [])] 
    });

    // API request Options
    const requestOption = {
        method: "POST",
        headers: {"Content-Type": "application/json`"},
        body: JSON.stringify({
            contents: chatHistory
        })
    }

    try{
        // Fetch bot response from API
        const response = await fetch(API_URL, requestOption);
        const data = await response.json();
        if(!response.ok) throw new Error(data.error.message)

        // Extract and display bot response text
        const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
        messageElement.innerText = apiResponseText;
        console.log(apiResponseText);

        // Add bot response to chat history
        chatHistory.push({
            role: "model",
            "parts":[{text: apiResponseText }] 
        });
    }
    catch(error){
        console.log(error);
        // Handle error 
        messageElement.innerText = error.message;
        messageElement.style.color = "#ff0000";
    }
    finally{
        // Remove uploaded image
        userData.file = {};
        // Remove the incoming message element
        incomingMessageDiv.classList.remove("thinking");
        // Enable Auto scroll
        chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
    }
}

// Handling outgoing messages
const  handleOutGoingMessage = (e) =>{
    e.preventDefault(); //prevent from submitting

    userData.message = messageInput.value.trim(); // Storing in a global value to acces everywhere
    messageInput.value = "";
    fileUploadWrapper.classList.remove("file_uploaded");
    // messageInput.dispatchEvent(new Event("input"));

    // Create and display user message
    const messageContent = `<div class="message_text"></div>
    ${userData.file.data ? `<img src="data:${userData.file.mime_type};base64,${userData.file.data}" class="attachment" />` : ""}`;
    const outGoingMessageDiv = createMessageElement(messageContent, "user_message");
    outGoingMessageDiv.querySelector(".message_text").innerText = userData.message; // Instead of textContent use innerText 
    chatBody.appendChild(outGoingMessageDiv);
    // Enable Auto scroll
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });

    setTimeout(() =>{
        // Simulate bot response with thinking indicator adter a delay
        const messageContent = `<svg class="bot_avathar" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-5l-5 3v-3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3zM9.5 9h.01m4.99 0h.01"/><path d="M9.5 13a3.5 3.5 0 0 0 5 0"/></g></svg>
                <div class="message_text">
                    <div class="thinking_indicator">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>`;
        const incomingMessageDiv = createMessageElement(messageContent, "bot_message", "thinking");
        chatBody.appendChild(incomingMessageDiv);
        // Enable Auto scroll
        chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
        generateBotResponse(incomingMessageDiv); // Bot response function call
    }, 600)
}

// Handle Enter key for sending messages
messageInput.addEventListener("keydown", (e) => {
    // console.log("hi")
    const userMessage = e.target.value.trim();
    // console.log(userMessage)
    if ( e.key === "Enter" && userMessage) {
        handleOutGoingMessage(e);
    }
    // else{
    //     console.log("Please enter a message");
    // }
})

// Adjust message input height dynamically
messageInput.addEventListener("input", () =>{
    messageInput.style.height = `${intialInputHeight}px`;
    messageInput.style.height = `${messageInput.scrollHeight}px`;
    document.querySelector(".chat_form").style.borderRadius = messageInput.scrollHeight > intialInputHeight ? "15px" : "32";
})

// Handle file input change
fileInput.addEventListener("change", () =>{
    const file = fileInput.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        // Setting image source to the message box for preview the selected file
        fileUploadWrapper.querySelector("img").src = e.target.result;
        fileUploadWrapper.classList.add("file_uploaded");
        const base64String = e.target.result.split(",")[1];

        // Store file data in userData
        userData.file = {
            data : base64String,
            mime_type: file.type,
        }
        fileInput.value = "";
        console.log(userData);
    }
    reader.readAsDataURL(file);
    console.log(file);
})

// Cancel file upload
fileCancelButton.addEventListener("click", () =>{
    userData.file = {};
    fileUploadWrapper.classList.remove("file_uploaded");
})


sendMessageButton.addEventListener("click", (e) =>{
    handleOutGoingMessage(e);
})
// Trigger the file upload event when clicked
document.querySelector("#file_upload").addEventListener("click", () => fileInput.click());
chatbotToggler.addEventListener("click", () =>{
    document.body.classList.toggle("show_chatbot")
})
closeChatBot.addEventListener("click", () =>{
    document.body.classList.remove("show_chatbot");
})
// console.log("hi")