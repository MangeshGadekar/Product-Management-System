function Navbar() {
  return (
    <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between">

      {/* Page Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-800">
          Dashboard
        </h2>
        <p className="text-sm text-slate-500">
          Manage your products efficiently
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        {/* Search */}
        <div className="flex items-center bg-slate-100 rounded-lg px-6 py-2">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-2 w-40 text-sm"
          />
        </div>

        {/* Notification */}
        <button className="text-xl">
          🔔
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            A
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800">
              Admin
            </p>
            <p className="text-xs text-slate-500">
              Administrator
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}

export default Navbar;