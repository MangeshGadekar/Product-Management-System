function Sidebar() {
  return (
    <aside className="w-64 h-screen fixed top-0 left-0 bg-slate-900 text-white p-5">

      {/* Logo */}
      <h1 className="text-2xl font-bold mb-10">
        Product<span className="text-blue-400">Hub</span>
      </h1>

      {/* Navigation */}
      <nav className="space-y-3">

        <a className="flex items-center gap-3 bg-blue-600 p-3 rounded-lg">
          <span>📊</span>
          Dashboard
        </a>

        <a className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700">
          <span>📦</span>
          Products
        </a>

        <a className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700">
          <span>📂</span>
          Categories
        </a>

        <a className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700">
          <span>🏷️</span>
          Brands
        </a>

        <a className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700">
          <span>⚙️</span>
          Settings
        </a>

      </nav>
    </aside>
  );
}

export default Sidebar;