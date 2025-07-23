export default function Timer({ seconds = 30 }) {
    return (
      <div className="text-center text-xl font-bold" id="timer">
        {seconds}
      </div>
    );
  }
  