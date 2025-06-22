/* import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import ErrorDisplay from "./ErrorDisplay";
import AddCategoryForm from "./AddCategoryForm";
import CategoryTable from "./CategoryTable";
import EmptyState from "./EmptyState";

const Product = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/categories");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleCategory = (categoryId, e) => {
    e.stopPropagation();
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <ErrorDisplay error={error} onRetry={() => window.location.reload()} />
    );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Product Categories</h1>
        <div className="flex space-x-3">
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center"
            onClick={() => setShowAddForm(true)}
          >
            Add Category
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center">
            Export
          </button>
        </div>
      </div>

      {showAddForm && <AddCategoryForm onClose={() => setShowAddForm(false)} />}

      {categories.length > 0 ? (
        <CategoryTable
          categories={categories}
          expandedCategory={expandedCategory}
          toggleCategory={toggleCategory}
        />
      ) : (
        <EmptyState onAddClick={() => setShowAddForm(true)} />
      )}
    </div>
  );
};

export default Product;
 */
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import ErrorDisplay from "./ErrorDisplay";
import AddCategoryForm from "./AddCategoryForm";
import CategoryTable from "./CategoryTable";
import EmptyState from "./EmptyState";

const Product = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("http://localhost:8080/categories");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleCategory = (categoryId, e) => {
    e.stopPropagation();
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleCategoryAdded = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/categories");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay error={error} onRetry={handleRetry} />;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Product Categories</h1>
        <div className="flex space-x-3">
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center"
            onClick={() => setShowAddForm(true)}
          >
            Add Category
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center">
            Export
          </button>
        </div>
      </div>

      {showAddForm && (
        <AddCategoryForm
          onClose={() => setShowAddForm(false)}
          onCategoryAdded={handleCategoryAdded}
        />
      )}

      {categories.length > 0 ? (
        <CategoryTable
          categories={categories}
          expandedCategory={expandedCategory}
          toggleCategory={toggleCategory}
        />
      ) : (
        <EmptyState onAddClick={() => setShowAddForm(true)} />
      )}
    </div>
  );
};

export default Product;
