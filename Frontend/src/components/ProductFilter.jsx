import { useState, useEffect } from "react";

function ProductFilter({ onApplyFilters }) {

    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const [categories, setCategories] = useState([]);

    useEffect(() => {
    fetch('http://localhost:8080/api/categories')
        .then(response => response.json())
        .then(data => {
        setCategories(data);
        })
        .catch(error => {
        console.error("Error fetching categories:", error);
        });
    }, []);


    const [brands, setBrands] = useState([]);

    useEffect(() => {

        setBrand('');
        setBrands([]);

        if (!category) {
            return;
        }

        fetch(`http://localhost:8080/api/brand/by-category?category=${encodeURIComponent(category)}`)

            .then(response => response.json())
            .then(data => {
                setBrands(data);
            })
            .catch(error => {
                console.error("Error fetching brands:", error);
            });

    }, [category]);


  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mt-4">

      <h3 className="font-semibold text-slate-800 mb-4">
        Filter Products
      </h3>

      {/* Category Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">
            Category
        </label>

        <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2"
            >
            <option value="">All Categories</option>

            {categories.map((categoryItem) => (
                <option key={categoryItem.id} value={categoryItem.name}>
                    {categoryItem.name}
                </option>
            ))}
        </select>
        </div>

      {/* Brand Filter */}
        <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">
            Brand
        </label>

        <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            disabled={!category}
            className="w-full border border-slate-300 rounded-lg px-3 py-2"
        >
            <option value="">
                {category ? 'All Brands' : 'Select Category First'}
            </option>

            {brands.map((brandItem) => (
            <option key={brandItem.id} value={brandItem.name}>
                {brandItem.name}
            </option>
            ))}
        </select>
        </div>

    
        {/* Price Filter */}
      <div className="grid grid-cols-2 gap-4 mt-4">

        {/* Minimum Price */}
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
                Min Price
            </label>

            <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Minimum Price"
                className="w-full border border-slate-300 rounded-lg px-3 py-2"
            />
        </div>

        {/* Maximum Price */}
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
                Max Price
            </label>

            <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Maximum Price"
                className="w-full border border-slate-300 rounded-lg px-3 py-2"
            />
        </div>
    </div>

      <div className="flex justify-end mt-5">
        <button
            onClick={() => onApplyFilters({
                category,
                brand,
                minPrice,
                maxPrice
            })}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg">
            Apply Filters
        </button>
      </div>

    </div>
  );
}

export default ProductFilter;