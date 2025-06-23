import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SubcategoryTable from "./Products/SubcategoryTable";

const SubcategoryPage = () => {
  const { id } = useParams();
  const [currentCategory, setCurrentCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`http://localhost:8080/categories/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch category");
        }
        const data = await response.json();
        setCurrentCategory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  const handleDelete = async (subcategoryId) => {
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

      setCurrentCategory((prev) => ({
        ...prev,
        subcategories: prev.subcategories.filter(
          (sc) => sc.id !== subcategoryId
        ),
      }));
    } catch (error) {
      console.error("Delete error:", error);
      setError(error.message);
    }
  };

  const handleUpdate = async (updatedSubcategory) => {
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

      setCurrentCategory((prev) => ({
        ...prev,
        subcategories: prev.subcategories.map((sc) =>
          sc.id === data.id ? data : sc
        ),
      }));

      return data;
    } catch (error) {
      console.error("Update error:", error);
      setError(error.message);
      throw error;
    }
  };

  const handleAdd = async (newSubcategory) => {
    try {
      const response = await fetch("http://localhost:8080/subcategories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newSubcategory,
          categoryId: currentCategory.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add subcategory");
      }

      const data = await response.json();

      setCurrentCategory((prev) => ({
        ...prev,
        subcategories: [...prev.subcategories, data],
      }));

      return data;
    } catch (error) {
      console.error("Add error:", error);
      setError(error.message);
      throw error;
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">Error: {error}</div>;
  }

  if (!currentCategory) {
    return <div className="p-6 text-red-600">Category not found.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Subcategories of {currentCategory.name}
      </h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <SubcategoryTable
        subcategories={currentCategory.subcategories || []}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        onAdd={handleAdd}
        categoryId={currentCategory.id}
      />
    </div>
  );
};

export default SubcategoryPage;
