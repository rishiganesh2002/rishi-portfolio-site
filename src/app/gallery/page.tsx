export default function Gallery() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Gallery</h1>
        <p className="text-lg text-gray-600 mb-8">
          This page is currently under development.
        </p>
        <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-lg">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-purple-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Coming Soon
        </div>
      </div>
    </div>
  );
}
