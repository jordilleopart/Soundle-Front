export default function ChatHeader({ onClose }) {
    return (
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-sm">Chat</span>
        <button onClick={onClose} className="text-gray-400 hover:text-white">×</button>
      </div>
    );
  }
  