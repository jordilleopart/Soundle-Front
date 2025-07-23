import ChatHeader from "../molecules/ChatHeader";
import ChatMessages from "../molecules/ChatMessages";
import ChatInput from "../molecules/ChatInput";
import { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);

  const handleSend = (msg) => {
    setMessages((prev) => [...prev, msg]);
  };

  const handleClose = () => {
    console.log("Chat closed (implement UI logic)");
  };

  return (
    <div className="border border-zinc-700 rounded p-4 w-full md:w-1/4 bg-zinc-900 flex flex-col">
      <ChatHeader onClose={handleClose} />
      <ChatMessages messages={messages} />
      <ChatInput onSend={handleSend} />
    </div>
  );
}
