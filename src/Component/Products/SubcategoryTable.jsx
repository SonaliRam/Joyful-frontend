const SubcategoryTable = ({ subcategories }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            ID
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Image
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {subcategories.map((subcategory) => (
          <tr
            key={`subcategory-${subcategory.id}`}
            className="hover:bg-gray-50"
          >
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
              #{subcategory.id}
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
              {subcategory.name}
            </td>
            <td className="px-4 py-3 whitespace-nowrap">
              {subcategory.imagePath && (
                <img
                  className="h-10 w-10 rounded-lg object-cover border border-gray-200"
                  src={subcategory.imagePath}
                  alt={subcategory.name}
                />
              )}
            </td>
            <td className="px-4 py-3 whitespace-nowrap">
              <span
                className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  subcategory.published
                    ? "bg-green-100 text-green-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {subcategory.published ? "Published" : "Draft"}
              </span>
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium space-x-2">
              <button className="text-indigo-600 hover:text-indigo-900">
                Edit
              </button>
              <button className="text-red-600 hover:text-red-900">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default SubcategoryTable;
