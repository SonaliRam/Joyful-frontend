import { Fragment } from "react";

const CategoryRow = ({
  category,
  expandedCategory,
  toggleCategory,
  children,
}) => (
  <Fragment key={`category-${category.id}`}>
    <tr
      className={`hover:bg-gray-50 ${
        expandedCategory === category.id ? "bg-blue-50" : ""
      }`}
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        #{category.id}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          {category.imagePath && (
            <div className="flex-shrink-0 h-10 w-10">
              <img
                className="h-10 w-10 rounded-lg object-cover border border-gray-200"
                src={category.imagePath}
                alt={category.name}
              />
            </div>
          )}
          <div className="ml-4">
            <div className="text-sm font-semibold text-gray-900">
              {category.name}
            </div>
            <div className="text-sm text-gray-500 line-clamp-1 max-w-xs">
              {category.description}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
            category.published
              ? "bg-green-100 text-green-800"
              : "bg-amber-100 text-amber-800"
          }`}
        >
          {category.published ? "Published" : "Draft"}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
        <button
          onClick={(e) => toggleCategory(category.id, e)}
          className={`px-3 py-1 rounded-md ${
            expandedCategory === category.id
              ? "bg-gray-200 text-gray-700"
              : "bg-blue-100 text-blue-700"
          } hover:bg-blue-200 transition-colors`}
        >
          {expandedCategory === category.id ? "Hide" : "View"}
        </button>
        <button className="px-3 py-1 bg-amber-100 text-amber-700 rounded-md hover:bg-amber-200 transition-colors">
          Edit
        </button>
      </td>
    </tr>
    {expandedCategory === category.id && children}
  </Fragment>
);

export default CategoryRow;
