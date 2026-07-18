const StatsCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-5 hover:shadow-lg transition">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500">{title}</p>

          <h2 className="text-3xl font-bold mt-2">{value}</h2>
        </div>

        <div className="text-4xl text-slate-700">{icon}</div>
      </div>
    </div>
  );
};

export default StatsCard;
