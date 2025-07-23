export default function ChatMessages({ messages = [] }) {
    return (
      <div className="flex-1 overflow-y-auto text-sm text-gray-300 mb-2 space-y-1">
        {messages.length === 0 ? (
          <p className="text-gray-500">No messages yet</p>
        ) : (
          messages.map((msg, i) => <p key={i}>{msg}</p>)
        )}
      </div>
    );
  }
  