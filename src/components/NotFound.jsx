export default function NotFoundPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-blue-600 animate-pulse">404</h1>
        <h2 className="text-2xl font-medium text-blue-800 mt-4">
          Page Not Found
        </h2>
        <p className="text-gray-700 mt-2">
          Sorry, the page you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
      <div className="mt-8">
        <a
          href="/home"
          className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
}
