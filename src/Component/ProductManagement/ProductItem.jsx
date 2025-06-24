const ProductItem = ({ product, onDelete, onEdit }) => {
  return (
    <div className="grid grid-cols-5 items-center gap-4 p-3 border-b bg-white shadow-sm rounded-md mb-2">
      {/* Image */}
      <img
        src={product.mainImage}
        alt={product.name}
        className="w-20 h-20 object-cover rounded-md border"
      />

      {/* Product Name */}
      <div className="text-sm font-medium">{product.name}</div>

      {/* Category Name */}
      <div className="text-sm text-gray-700">
        {product.subcategory?.category?.name || "N/A"}
      </div>

      {/* Subcategory Name */}
      <div className="text-sm text-gray-700">
        {product.subcategory?.name || "N/A"}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => onEdit(product)}
          className="text-blue-600 hover:underline text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="text-red-600 hover:underline text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
