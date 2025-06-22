const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    <span className="ml-4 text-indigo-600 font-medium">
      Loading categories...
    </span>
  </div>
);

export default LoadingSpinner;
