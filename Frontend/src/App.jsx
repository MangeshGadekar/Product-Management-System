import { useState, useEffect } from 'react'

import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import StatsCard from './components/StatsCard'
import ProductsTable from './components/ProductTable';

function App() {

    // const [totalProducts, setProducts] = useState(0);
    const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalBrands: 0,
    lowStockProducts: 0
});

    useEffect(() => {

        fetch("http://localhost:8080/api/products/dashboard/stats")
        .then((response) => response.json())
        .then(data => { 
            console.log("Fetched products:", data);
            setStats(data);
        })
        .catch((error) => {
            console.error("Error fetching products:", error);
        });

    }, []);

  return (
    <div className="flex min-h-screen">

      <Sidebar />

      <div className="ml-64 flex-1 min-w-0 bg-slate-100">

        <Navbar />

        <main className="p-8">

          <h1 className="text-2xl font-bold text-slate-800 mb-6">
            Dashboard Overview
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            <StatsCard
              title="Total Products"
              value={stats.totalProducts}
              icon="📦"
              color="bg-blue-100"
              description="Products in inventory"
            />

            <StatsCard
              title="Categories"
              value={stats.totalCategories}
              icon="📂"
              color="bg-purple-100"
              description="Available categories"
            />

            <StatsCard
              title="Brands"
              value={stats.totalBrands}
              icon="🏷️"
              color="bg-green-100"
              description="Registered brands"
            />

            <StatsCard
              title="Low Stock"
              value={stats.lowStockProducts}
              icon="⚠️"
              color="bg-orange-100"
              description="Products need restocking"
            />

          </div>

          <ProductsTable />

        </main>

      </div>

    </div>
  );
}

export default App;