import CategoryRow from "./CategoryRow";
import SubcategoryTable from "./SubcategoryTable";

const CategoryTable = ({
  categories,
  expandedCategory,
  toggleCategory,
  setCategories,
}) => {
  const handleDeleteSubcategory = async (subcategoryId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/subcategories/${subcategoryId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete subcategory");
      }

      setCategories((prev) =>
        prev.map((category) => ({
          ...category,
          subcategories: category.subcategories.filter(
            (sc) => sc.id !== subcategoryId
          ),
        }))
      );
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleUpdateSubcategory = async (updatedSubcategory) => {
    try {
      const response = await fetch(
        `http://localhost:8080/subcategories/${updatedSubcategory.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedSubcategory),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update subcategory");
      }

      const data = await response.json();

      setCategories((prev) =>
        prev.map((category) => ({
          ...category,
          subcategories: category.subcategories.map((sc) =>
            sc.id === data.id ? data : sc
          ),
        }))
      );

      return data;
    } catch (error) {
      console.error("Update error:", error);
      throw error;
    }
  };

  const handleAddSubcategory = async (newSubcategory) => {
    try {
      const response = await fetch("http://localhost:8080/subcategories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSubcategory),
      });

      if (!response.ok) {
        throw new Error("Failed to add subcategory");
      }

      const data = await response.json();

      setCategories((prev) =>
        prev.map((category) =>
          category.id === newSubcategory.categoryId
            ? {
                ...category,
                subcategories: [...category.subcategories, data],
              }
            : category
        )
      );

      return data;
    } catch (error) {
      console.error("Add error:", error);
      throw error;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        {/* ... existing table header ... */}
        <tbody className="bg-white divide-y divide-gray-200">
          {categories.map((category) => (
            <CategoryRow
              key={category.id}
              category={category}
              expandedCategory={expandedCategory}
              toggleCategory={toggleCategory}
            >
              {category.subcategories && category.subcategories.length > 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-4">
                    <SubcategoryTable
                      subcategories={category.subcategories}
                      onDelete={handleDeleteSubcategory}
                      onUpdate={handleUpdateSubcategory}
                      onAdd={handleAddSubcategory}
                      categoryId={category.id}
                    />
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
