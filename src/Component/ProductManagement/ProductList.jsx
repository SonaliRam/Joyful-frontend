
import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import ProductItem from "./ProductItem.jsx";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:8080/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8080/products/${id}`, {
      method: "DELETE",
    });
    fetchProducts();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    fetchProducts();
    setShowForm(false);
    setEditingProduct(null);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Product List</h2>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Product
        </button>
      </div>

      {showForm && (
        <ProductForm
          product={editingProduct}
          onClose={() => setShowForm(false)}
          onSuccess={handleFormSubmit}
        />
      )}

      <div className="border rounded p-2 bg-white">
        {/* Header Row - Added This Block */}
        <div className="grid grid-cols-5 items-center gap-4 px-3 py-2 bg-gray-200 font-semibold border-b">
          <div>Image</div>
          <div>Product Name</div>
          <div>Category</div>
          <div>Sub Category</div>
          <div>Option</div>
        </div>
        {/* End of Header */}

        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
