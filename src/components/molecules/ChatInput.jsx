import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() !== "") {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 px-3 py-2 rounded bg-zinc-800 text-white text-sm"
      />
      <button
        onClick={handleSend}
        className="bg-white text-black px-3 py-2 rounded"
      >
        Send
      </button>
    </div>
  );
}
