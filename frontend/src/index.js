import './index.css';
import reportWebVitals from './reportWebVitals';

// Ensure that DOM content is fully loaded before selecting elements
document.addEventListener("DOMContentLoaded", function () {
  // Select necessary DOM elements
  const inputField = document.getElementById("message-input");
  const sendButton = document.getElementById("send-button");
  const messageArea = document.getElementById("messages").querySelector(".space-y-4");

  // Function to append message to the conversation area
  function appendMessage(sender, text) {
    const messageDiv = document.createElement("div");

    // Add classes based on sender (user or bot)
    if (sender === "You") {
      messageDiv.classList.add("flex", "w-full", "mb-4", "justify-end");
      messageDiv.innerHTML = `
        <div class="flex items-start space-x-reverse">
          <div class="p-2 rounded-full bg-gray-100 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 12h8"></path>
              <path d="M12 8v8"></path>
            </svg>
          </div>
          <div class="rounded-2xl px-4 py-2 bg-blue-600 text-white">
            <p class="text-sm md:text-base">${text}</p>
          </div>
        </div>`;
    } else {
      messageDiv.classList.add("flex", "w-full", "mb-4", "justify-start");
      messageDiv.innerHTML = `
        <div class="flex items-start space-x-2">
          <div class="p-2 rounded-full bg-blue-100 text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 8V4H8"></path>
              <path d="M12 4h4"></path>
              <rect x="4" y="8" width="16" height="12" rx="2"></rect>
              <path d="M2 14h2"></path>
              <path d="M20 14h2"></path>
              <path d="M15 13v2"></path>
              <path d="M9 13v2"></path>
            </svg>
          </div>
          <div class="rounded-2xl px-4 py-2 bg-blue-50 text-gray-800">
            <p class="text-sm md:text-base">${text}</p>
          </div>
        </div>`;
    }

    messageArea.appendChild(messageDiv);

    // Automatically scroll to the latest message
    messageArea.scrollTop = messageArea.scrollHeight;
  }

  // Append initial bot message
  appendMessage("Bot", "Welcome! I am your ethical assistant. How can I assist you today?");

  // Function to handle user input
  function handleUserInput() {
    const userInput = inputField.value.trim();

    if (userInput !== "") {
      // Append the user's message
      appendMessage("You", userInput);

      // Clear input field
      inputField.value = "";

      // Send user input to Flask API and get bot response
      const apiUrl = 'https://ethical-decision-assistant-production.up.railway.app/api/decision';  // Replace with your Railway app's URL

      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      })
        .then(response => response.json())
        .then(data => {
          console.log("Received response from API:", data);  // Check the API response in the console
          const botResponse = data.bot_response || "Sorry, I couldn't process that.";
          appendMessage("Bot", botResponse);
        })
        .catch(error => {
          console.error('Error:', error);
          appendMessage("Bot", "Sorry, there was an error.");
        });
    }
  }

  // Add event listeners for send button and Enter key press
  sendButton.addEventListener("click", handleUserInput);

  inputField.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      handleUserInput();
    }
  });
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
