import CategoryRow from "./CategoryRow";
import SubcategoryTable from "./SubcategoryTable";

const CategoryTable = ({ categories, expandedCategory, toggleCategory }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name & Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {categories.map((category) => (
            <CategoryRow
              key={category.id}
              category={category}
              expandedCategory={expandedCategory}
              toggleCategory={toggleCategory}
            >
              {/** ✅ Add this nested row only if subcategories exist */}
              {category.subcategories && category.subcategories.length > 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-4">
                    <SubcategoryTable subcategories={category.subcategories} />
                  </td>
                </tr>
              )}
            </CategoryRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
