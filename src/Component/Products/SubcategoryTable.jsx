import { useState } from "react";
import SubcategoryForm from "./SubcategoryForm";

const SubcategoryTable = ({
  subcategories,
  onDelete,
  onUpdate,
  onAdd,
  categoryId,
}) => {
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleEdit = (subcategory) => {
    setEditingId(subcategory.id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSave = async (updatedSubcategory) => {
    try {
      await onUpdate(updatedSubcategory);
      setEditingId(null);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const handleAdd = async (newSubcategory) => {
    try {
      await onAdd({ ...newSubcategory, categoryId });
      setShowAddForm(false);
    } catch (error) {
      console.error("Add error:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-medium">Subcategories</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Add Subcategory
        </button>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
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
          {showAddForm && (
            <tr>
              <td colSpan="5" className="px-6 py-4">
                <SubcategoryForm
                  onSubmit={handleAdd}
                  onCancel={() => setShowAddForm(false)}
                />
              </td>
            </tr>
          )}
          {subcategories.map((subcategory) =>
            editingId === subcategory.id ? (
              <tr key={subcategory.id}>
                <td colSpan="5" className="px-6 py-4">
                  <SubcategoryForm
                    initialValues={subcategory}
                    onSubmit={handleSave}
                    onCancel={handleCancelEdit}
                  />
                </td>
              </tr>
            ) : (
              <tr key={subcategory.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {subcategory.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {subcategory.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {subcategory.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      subcategory.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {subcategory.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(subcategory)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(subcategory.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SubcategoryTable;
