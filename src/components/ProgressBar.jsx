
const ProgressBar = ({ value, maxValue }) => {
  const progress = (value / maxValue) * 100;

  return (
    <div className="relative h-full bg-gray-200 rounded-sm overflow-hidden">
      <div
        className="absolute top-0 left-0 h-full bg-rose-400"
        style={{ width: `${progress}%` }}
      ></div>
      <div className="relative flex items-center h-full">
        <div className="text-white text-lg pl-2 pr-1">{value}</div>
      </div>
    </div>
  );
};

export default ProgressBar;
