function StatsCard({ title, value, icon, color, description }) {
    
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-slate-500 font-medium">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-slate-800 mt-2">
            {value}
          </h2>
        </div>

        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-2xl`}>
          {icon}
        </div>

      </div>

      <p className="text-xs text-slate-500 mt-4">
        {description}
      </p>

    </div>
  );
}

export default StatsCard;