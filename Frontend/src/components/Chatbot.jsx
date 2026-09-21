import { useState } from "react";
import "./Chatbot.css";

const locations = [
  "Hackathon Center",
  "Block 8",
  "Lab Block 1",
  "Lab Block 2",
  "Lab Block 3",
  "Lab Block 4",
  "Lab Block 5",
  "Block 6 MBA Block",
  "Central Library",
  "Classroom Block 5",
  "Drawing Hall 1 & 2",
  "Block 10",
  "Class Block 2",
  "Classroom Block 3",
  "Classroom Block 1",
  "Classroom Block 4",
  "Block 11",
  "Block 12",
  "Block 1",
  "Block 2",
  "Block 3",
  "Block 4",
  "Block 5",
  "Block 9",
  "Auditorium",
  "Admin Block",
  "Bus Bay",
  "Trinity",
  "Boys Mess",
  "Girls Veg Mess",
];

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! 👋 I'm your Smart Campus Assistant. Ask me about a campus location or navigation.",
    },
  ]);

  const [input, setInput] = useState("");
const [isOpen, setIsOpen] = useState(false);
  async function getBotReply(question) {
    const text = question.toLowerCase().trim();

    if (!text) {
      return "Please type a question 😊";
    }

    if (
      text === "hi" ||
      text === "hello" ||
      text === "hey"
    ) {
      return "Hello! 👋 How can I help you find something on campus?";
    }

    if (
      text.includes("locations") ||
      text.includes("available") ||
      text.includes("places")
    ) {
      return `I can help you with ${locations.length} campus locations, including Block 11, Block 12, Central Library and Hackathon Center.`;
    }

    const destination = locations.find((location) =>
      text.includes(location.toLowerCase())
    );

    if (
      text.includes("take me") ||
      text.includes("how do i reach") ||
      text.includes("how to reach") ||
      text.includes("navigate") ||
      text.includes("route")
    ) {
      if (!destination) {
        return "🧭 Please tell me the destination. Example: Take me to Block 11.";
      }

      try {
        if (!navigator.geolocation) {
          return "⚠️ GPS is not supported by your browser.";
        }

        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            resolve,
            reject,
            {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 0,
            }
          );
        });

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/navigation/route-from-location`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              latitude,
              longitude,
              destinationName: destination,
            }),
          }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          return `⚠️ I couldn't find a route to ${destination}.`;
        }

        const route = result.route;

        const distance =
          route?.distance?.kilometers ?? route?.distance?.km;

        const duration =
          route?.duration?.minutes ?? route?.duration?.min;

        if (distance == null || duration == null) {
          return "⚠️ Route found, but distance information is unavailable.";
        }

        return `🧭 Route found!

📍 Your current location
🎯 To: ${destination}

📏 Distance: ${distance} km
⏱️ Walking time: ${duration} minutes`;
      } catch (error) {
        console.error("GPS/Navigation error:", error);

        if (error?.code === 1) {
          return "📍 Location permission was denied. Please allow location access and try again.";
        }

        if (error?.code === 2) {
          return "📍 Your current location could not be detected.";
        }

        if (error?.code === 3) {
          return "📍 GPS request timed out. Please try again.";
        }

        return "⚠️ I couldn't connect to the Smart Campus backend.";
      }
    }

    if (
      text.includes("where is") ||
      text.includes("location of") ||
      text.includes("find")
    ) {
      if (destination) {
        return `📍 ${destination} is available on the Smart Campus map. You can open the Campus Map to view its exact location and get navigation.`;
      }

      return "I can help you find campus buildings. Try asking: Where is Block 11?";
    }

    if (
      text.includes("help") ||
      text.includes("what can you do")
    ) {
      return `I can help you with:

📍 Find campus locations
🧭 Navigation
🏫 Campus buildings
📚 Library and labs
🏆 Hackathon Center

Try asking "Take me to Block 11".`;
    }

    return "I'm still learning the campus 😊 Try asking about Block 11, Block 12, Central Library, Lab Block 5 or Hackathon Center.";
  }

  async function sendMessage() {
    if (!input.trim()) return;

    const userText = input;

    setMessages((previous) => [
      ...previous,
      {
        sender: "user",
        text: userText,
      },
    ]);

    setInput("");

    const reply = await getBotReply(userText);

    setMessages((previous) => [
      ...previous,
      {
        sender: "bot",
        text: reply,
      },
    ]);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  }
return (
  <>
    {/* Floating chatbot button */}
    <button
      className="chatbot-floating-button"
      onClick={() => setIsOpen(!isOpen)}
      aria-label="Open Smart Campus Assistant"
    >
      🤖
    </button>

    {/* Chatbot window */}
    {isOpen && (
      <div className="chatbot-container">

        <div className="chatbot-header">
          <div className="bot-icon">🤖</div>

          <div>
            <h1>Campus Assistant</h1>
            <p>Smart Campus Help</p>
          </div>

          <button
            className="chatbot-close"
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
        </div>

        <div className="chat-area">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message-row ${message.sender}`}
            >
              <div className="message">
                <div>{message.text}</div>

                {message.text.includes("🧭 Route found") && (
                  <button
                    className="map-button"
                    onClick={() => {
                      window.open("/campus-map", "_blank");
                    }}
                  >
                    🗺️ Open Campus Map
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="input-area">
          <input
            type="text"
            placeholder="Ask about your campus..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button onClick={sendMessage}>
            ➤
          </button>
        </div>

      </div>
    )}
  </>
);

}
  


export default Chatbot;
