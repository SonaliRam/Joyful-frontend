import { useEffect, useState } from 'react';

const Product = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedCategory, setExpandedCategory] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/categories');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Fetched data:', data);
                setCategories(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const toggleCategory = (categoryId, e) => {
        e.stopPropagation(); // Prevent event bubbling
        setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                <span className="ml-4 text-indigo-600 font-medium">Loading categories...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 max-w-4xl mx-auto mt-8 rounded-lg shadow-sm">
                <div className="flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="font-bold">Error Loading Data</p>
                </div>
                <p className="mt-2">{error}</p>
                <button 
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Product Categories</h1>
                <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Category
                    </button>
                    <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Export
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {categories.map((category) => (
                                <>
                                    <tr
                                        key={category.id}
                                        className={`hover:bg-gray-50 ${expandedCategory === category.id ? 'bg-blue-50' : ''}`}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            #{category.id}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                {category.imagePath && (
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img className="h-10 w-10 rounded-lg object-cover border border-gray-200" src={category.imagePath} alt={category.name} />
                                                    </div>
                                                )}
                                                <div className="ml-4">
                                                    <div className="text-sm font-semibold text-gray-900">{category.name}</div>
                                                    <div className="text-sm text-gray-500 line-clamp-1 max-w-xs">{category.description}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${category.published ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                                                {category.published ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                            <button
                                                onClick={(e) => toggleCategory(category.id, e)}
                                                className={`px-3 py-1 rounded-md ${expandedCategory === category.id ? 'bg-gray-200 text-gray-700' : 'bg-blue-100 text-blue-700'} hover:bg-blue-200 transition-colors`}
                                            >
                                                {expandedCategory === category.id ? 'Hide' : 'View'}
                                            </button>
                                            <button className="px-3 py-1 bg-amber-100 text-amber-700 rounded-md hover:bg-amber-200 transition-colors">
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                    {expandedCategory === category.id && (
                                        <tr className="bg-gray-50">
                                            <td colSpan="4" className="px-6 py-4">
                                                <div className="space-y-6">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs">
                                                            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                                                <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                                Category Details
                                                            </h3>
                                                            <div className="space-y-3">
                                                                <div>
                                                                    <p className="text-xs font-medium text-gray-500 uppercase">SEO Title</p>
                                                                    <p className="text-sm mt-1 font-medium">{category.seoTitle || 'Not specified'}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs font-medium text-gray-500 uppercase">Search Keywords</p>
                                                                    <p className="text-sm mt-1 font-medium">{category.searchKeywords || 'Not specified'}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs">
                                                            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                                                <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                                                                </svg>
                                                                Statistics
                                                            </h3>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div className="bg-blue-50 p-3 rounded-lg">
                                                                    <p className="text-xs font-medium text-blue-600">Products</p>
                                                                    <p className="text-xl font-bold text-blue-800">24</p>
                                                                </div>
                                                                <div className="bg-green-50 p-3 rounded-lg">
                                                                    <p className="text-xs font-medium text-green-600">Subcategories</p>
                                                                    <p className="text-xl font-bold text-green-800">{category.subcategories?.length || 0}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {category.subcategories && category.subcategories.length > 0 && (
                                                        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs">
                                                            <div className="flex justify-between items-center mb-4">
                                                                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                                                                    <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                                    </svg>
                                                                    Subcategories
                                                                </h3>
                                                                <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                                                                    Add Subcategory
                                                                </button>
                                                            </div>
                                                            <div className="overflow-x-auto">
                                                                <table className="min-w-full divide-y divide-gray-200">
                                                                    <thead className="bg-gray-50">
                                                                        <tr>
                                                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                                        {category.subcategories.map((subcategory) => (
                                                                            <tr key={subcategory.id} className="hover:bg-gray-50">
                                                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">#{subcategory.id}</td>
                                                                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{subcategory.name}</td>
                                                                                <td className="px-4 py-3 whitespace-nowrap">
                                                                                    {subcategory.imagePath && (
                                                                                        <img className="h-10 w-10 rounded-lg object-cover border border-gray-200" src={subcategory.imagePath} alt={subcategory.name} />
                                                                                    )}
                                                                                </td>
                                                                                <td className="px-4 py-3 whitespace-nowrap">
                                                                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${subcategory.published ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                                                                                        {subcategory.published ? 'Published' : 'Draft'}
                                                                                    </span>
                                                                                </td>
                                                                                <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                                                                    <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                                                                    <button className="text-red-600 hover:text-red-900">Delete</button>
                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>

                {categories.length === 0 && !loading && (
                    <div className="p-8 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">No categories found</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by creating a new category.</p>
                        <div className="mt-6">
                            <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                New Category
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Product;