const EmptyState = ({ onAddClick }) => (
  <div className="p-8 text-center">
    <svg
      className="mx-auto h-12 w-12 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    </svg>
    <h3 className="mt-2 text-lg font-medium text-gray-900">
      No categories found
    </h3>
    <p className="mt-1 text-sm text-gray-500">
      Get started by creating a new category.
    </p>
    <div className="mt-6">
      <button
        onClick={onAddClick}
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        <svg
          className="-ml-1 mr-2 h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        New Category
      </button>
    </div>
  </div>
);

export default EmptyState;
