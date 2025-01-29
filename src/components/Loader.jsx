const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <p
        className="flex items-center gap-2 text-2xl animate-pulse text-red-600"
        aria-live="polite"
      >
        Loading...
        <span
          className="animate-spin text-black text-4xl"
          role="img"
          aria-label="Loading"
        >
          🔆
        </span>
      </p>
    </div>
  );
};

export default Loader;
