import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const CategoryRow = ({ category }) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/subcategories/${category.id}`, { state: { category } });
  };

  return (
    <Fragment key={`category-${category.id}`}>
      <tr className="hover:bg-gray-50">
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
            onClick={handleView}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
          >
            View
          </button>
          <button className="px-3 py-1 bg-amber-100 text-amber-700 rounded-md hover:bg-amber-200 transition-colors">
            Edit
          </button>
        </td>
      </tr>
    </Fragment>
  );
};

export default CategoryRow;
