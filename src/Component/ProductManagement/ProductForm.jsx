import { useState, useEffect } from "react";

const ProductForm = ({ product, onClose, onSuccess }) => {
  const isEdit = !!product;

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    variation: "",
    size: "",
    mainImage: "",
    filter: "",
    metaTitle: "",
    metaDescription: "",
    pageKeywords: "",
    isPublished: true,
    subcategory: { id: "" },
  });

  // Load all categories
  useEffect(() => {
    fetch("http://localhost:8080/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Failed to load categories", err));
  }, []);

  // If editing, load existing product data
  useEffect(() => {
    if (isEdit) {
      setFormData({ ...product });
      if (product?.subcategory?.category?.id) {
        fetchSubcategories(product.subcategory.category.id);
      }
    }
  }, [product]);

  // Fetch subcategories when a category is selected
  const fetchSubcategories = async (categoryId) => {
    try {
      const res = await fetch(
        `http://localhost:8080/subcategories/byCategory/${categoryId}`
      );
      const data = await res.json();
      setSubcategories(data);
    } catch (err) {
      console.error("Error fetching subcategories", err);
    }
  };

  // Handle form input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle Category selection
  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    fetchSubcategories(selectedCategoryId);
  };

  // Handle Subcategory selection
  const handleSubcategoryChange = (e) => {
    const subcategoryId = parseInt(e.target.value);
    setFormData((prev) => ({
      ...prev,
      subcategory: { id: subcategoryId },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isEdit
      ? `http://localhost:8080/products/${product.id}`
      : "http://localhost:8080/products";

    const method = isEdit ? "PUT" : "POST";

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      onSuccess();
    } catch (err) {
      console.error("Failed to submit form", err);
    }
  };

  return (
    <div className="border p-4 rounded bg-gray-50 mb-4">
      <h3 className="text-xl mb-2">{isEdit ? "Edit" : "Add"} Product</h3>
      <form onSubmit={handleSubmit} className="grid gap-3">
        {/* Product Basic Info */}
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="border p-2"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2"
        />
        <input
          name="variation"
          value={formData.variation}
          onChange={handleChange}
          placeholder="Variation"
          className="border p-2"
        />
        <input
          name="size"
          value={formData.size}
          onChange={handleChange}
          placeholder="Size"
          className="border p-2"
        />
        <input
          name="mainImage"
          value={formData.mainImage}
          onChange={handleChange}
          placeholder="Main Image URL"
          className="border p-2"
        />
        <input
          name="filter"
          value={formData.filter}
          onChange={handleChange}
          placeholder="Filter"
          className="border p-2"
        />

        {/* SEO Fields */}
        <input
          name="metaTitle"
          value={formData.metaTitle}
          onChange={handleChange}
          placeholder="Meta Title"
          className="border p-2"
        />
        <input
          name="metaDescription"
          value={formData.metaDescription}
          onChange={handleChange}
          placeholder="Meta Description"
          className="border p-2"
        />
        <input
          name="pageKeywords"
          value={formData.pageKeywords}
          onChange={handleChange}
          placeholder="Page Keywords"
          className="border p-2"
        />

        {/* Category Dropdown */}
        <select onChange={handleCategoryChange} className="border p-2">
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Subcategory Dropdown */}
        <select
          value={formData.subcategory?.id || ""}
          onChange={handleSubcategoryChange}
          className="border p-2"
        >
          <option value="">Select Subcategory</option>
          {subcategories.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.name}
            </option>
          ))}
        </select>

        {/* Publish Checkbox */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleChange}
          />
          Publish
        </label>

        {/* Buttons */}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {isEdit ? "Update" : "Create"} Product
        </button>
        <button
          type="button"
          onClick={onClose}
          className="text-red-600 underline"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
