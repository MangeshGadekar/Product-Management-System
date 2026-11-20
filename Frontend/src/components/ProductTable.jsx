import {useState, useEffect} from 'react';
import ProductFilter from './ProductFilter';

function ProductsTable() {

    //state variables for dynamic data fetching and pagination
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const [showFilters, setShowFilters] = useState(false);

    const [filters, setFilters] = useState({
        category : '',
        brand : '',
        minPrice : '',
        maxPrice : ''
    });


    useEffect(() => {
        const params = new URLSearchParams({
            page: currentPage,
            size: pageSize
        });

        if (filters.category) params.append('category', filters.category);
        if (filters.brand) params.append('brand', filters.brand);
        if (filters.minPrice) params.append('minPrice', filters.minPrice);
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);


        fetch(`http://localhost:8080/api/products?${params.toString()}`)
            .then(response => response.json())
            .then(data => {
                console.log("Products API Response:", data);
                setProducts(data.content);
                setTotalPages(data.totalPages);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            });

        }, [currentPage, pageSize, filters]);

  return (

    <div className="bg-white rounded-xl shadow-sm border border-slate-200 mt-8 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800">Products</h2>


        {/* filter button */}
        <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg"
            >
            Filters
        </button>

        {/* Page Size Selector */}
        <select
            value={pageSize}
            onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(0);
            }}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none"
            >
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
            <option value={100}>100 per page</option>
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          + Add Product
        </button>
      </div>

        {/* Filter Panel */}
        {showFilters && (
            <ProductFilter
                onApplyFilters={(selectedfilters) => {
                    setFilters(selectedfilters)
                    setCurrentPage(0);
                }}
            />
        )}

        {/* actual Table structure */}
        <div className="overflow-x-auto">
            <table className="w-full text-left">

            <thead className="bg-slate-50 text-slate-500 text-sm">
                <tr>
                    <th className="p-4">ID</th>
                    <th className="p-4">Product Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Brand</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Status</th>
                </tr>
            </thead>

            <tbody>

            {products.map((product) => (
                
                <tr key={product.id}
                    className="border-b border-slate-100 hover:bg-slate-50">
                
                    <td className="p-4">{product.id}</td>

                    <td className="p-4 font-medium text-slate-800">
                        {product.name}
                    </td>

                    <td className="p-4">{product.category}</td>

                    <td className="p-4">{product.brand}</td>

                    <td className="p-4">₹{product.price}</td>

                    <td className="p-4">{product.stockQuantity}</td>

                    <td className="p-4">
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${ product.productStatus === 'AVAILABLE'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                    >
                        {product.productStatus}
                    </span>
                </td>
            </tr>
            
            ))}

            </tbody>
            </table>
        </div>
        <div className="flex items-center justify-between mt-6">

  <p className="text-sm text-slate-500">
    Page {currentPage + 1} of {totalPages}
  </p>

  <div className="flex gap-3">

    <button
      onClick={() => setCurrentPage(currentPage - 1)}
      disabled={currentPage === 0}
      className="px-4 py-2 border rounded-lg text-sm disabled:opacity-40"
    > Previous </button>

    <button
      onClick={() => setCurrentPage(currentPage + 1)}
      disabled={currentPage >= totalPages - 1}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm disabled:opacity-40"
    > Next </button>
        </div>
    </div>
    
    </div>
  );
}

export default ProductsTable;
