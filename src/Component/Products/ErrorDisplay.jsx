const ErrorDisplay = ({ error, onRetry }) => (
  <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 max-w-4xl mx-auto mt-8 rounded-lg shadow-sm">
    <div className="flex items-center">
      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p className="font-bold">Error Loading Data</p>
    </div>
    <p className="mt-2">{error}</p>
    <button
      onClick={onRetry}
      className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
    >
      Retry
    </button>
  </div>
);

export default ErrorDisplay;