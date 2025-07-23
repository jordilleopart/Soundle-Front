export default function UserInput({ value, onChange, onSubmit }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit();
    }
  };

  return (
    <input
      type="text"
      placeholder="Type your guess here... (Press Enter to submit)"
      value={value}
      onChange={onChange}
      onKeyPress={handleKeyPress}
      className="w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-700 text-sm"
    />
  );
}