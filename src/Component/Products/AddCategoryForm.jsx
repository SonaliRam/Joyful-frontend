import { useState } from "react";

const AddCategoryForm = ({ onClose, onCategoryAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    imagePath: "",
    description: "",
    searchKeywords: "",
    seoTitle: "",
    seoKeywords: "",
    seoDescription: "",
    isPublished: true,
    subcategories: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8080/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save category");
      }

      const savedCategory = await response.json();
      onCategoryAdded(savedCategory); // Notify parent component
      onClose();
    } catch (err) {
      setError(err.message);
      console.error("Error saving category:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-8 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category Name*
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Category Name"
                className="w-full border px-4 py-2 rounded"
                required
              />
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image Path
              </label>
              <input
                type="text"
                name="imagePath"
                value={formData.imagePath}
                onChange={handleChange}
                placeholder="images/categories/example.jpg"
                className="w-full border px-4 py-2 rounded"
              />
            </div> */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image Path
              </label>
              <input
                type="text"
                name="imagePath"
                value={formData.imagePath}
                onChange={handleChange}
                placeholder="images/categories/example.jpg"
                className="w-full border px-4 py-2 rounded"
              />
              {formData.imagePath && (
                <div className="mt-2">
                  <img
                    src={formData.imagePath}
                    alt="Preview"
                    className="h-24 w-24 object-cover border rounded"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/100x100?text=Invalid+URL";
                    }}
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Category description"
                className="w-full border px-4 py-2 rounded"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search Keywords
              </label>
              <input
                type="text"
                name="searchKeywords"
                value={formData.searchKeywords}
                onChange={handleChange}
                placeholder="Comma-separated keywords"
                className="w-full border px-4 py-2 rounded"
              />
            </div>
          </div>

          {/* SEO Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SEO Title
              </label>
              <input
                type="text"
                name="seoTitle"
                value={formData.seoTitle}
                onChange={handleChange}
                placeholder="SEO Title"
                className="w-full border px-4 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SEO Keywords
              </label>
              <input
                type="text"
                name="seoKeywords"
                value={formData.seoKeywords}
                onChange={handleChange}
                placeholder="Comma-separated SEO keywords"
                className="w-full border px-4 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SEO Description
              </label>
              <textarea
                name="seoDescription"
                value={formData.seoDescription}
                onChange={handleChange}
                placeholder="SEO description"
                className="w-full border px-4 py-2 rounded"
                rows={3}
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Published
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Save Category
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryForm;
