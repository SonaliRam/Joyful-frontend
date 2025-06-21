import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
const ViewEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await fetch("http://localhost:8080/enquiries");
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setEnquiries(Array.isArray(data?.data) ? data.data : []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load enquiries. Please try again later.");
        setEnquiries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this enquiry?")) return;

    try {
      const response = await fetch(`http://localhost:8080/enquiries/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Delete failed");
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete enquiry. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brown-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-600 bg-red-50 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-brown-800">
        All Product Enquiries
      </h2>

      {enquiries.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">No enquiries found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-black">
              <tr>
                <th className="px-4 py-3 text-left text-xs md:text-sm font-medium text-white uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs md:text-sm font-medium text-white uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs md:text-sm font-medium text-white uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-xs md:text-sm font-medium text-white uppercase tracking-wider">
                  Product
                </th>
                <th className="px-4 py-3 text-left text-xs md:text-sm font-medium text-white uppercase tracking-wider hidden sm:table-cell">
                  Message
                </th>
                <th className="px-4 py-3 text-right text-xs md:text-sm font-medium text-white uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 ">
              {enquiries.map((enquiry) => (
                <tr key={enquiry.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {enquiry.fullName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    <a
                      href={`mailto:${enquiry.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {enquiry.email}
                    </a>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {enquiry.phone}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {enquiry.product}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 hidden sm:table-cell">
                    <div className="max-w-sm whitespace-pre-wrap break-words text-sm text-gray-900">
                      {enquiry.message}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDelete(enquiry.id)}
                      className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md transition-colors duration-200"
                      aria-label="Delete enquiry"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewEnquiries;
