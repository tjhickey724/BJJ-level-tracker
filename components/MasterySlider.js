export default function MasterySlider({ value, onChange, disabled }) {
  const getMasteryLabel = (level) => {
    if (level === 0) return 'Not Started';
    if (level <= 25) return 'Beginner';
    if (level <= 50) return 'Developing';
    if (level <= 75) return 'Proficient';
    if (level < 100) return 'Advanced';
    return 'Mastered';
  };

  const getMasteryColor = (level) => {
    if (level === 0) return 'text-gray-500';
    if (level <= 25) return 'text-red-500';
    if (level <= 50) return 'text-orange-500';
    if (level <= 75) return 'text-yellow-500';
    if (level < 100) return 'text-blue-500';
    return 'text-green-500';
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700">
          Adjust Mastery Level
        </label>
        <span className={`text-sm font-semibold ${getMasteryColor(value)}`}>
          {getMasteryLabel(value)}
        </span>
      </div>
      
      <input
        type="range"
        min="0"
        max="100"
        step="5"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        disabled={disabled}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
      
      <div className="flex justify-between text-xs text-gray-500">
        <span>0%</span>
        <span>25%</span>
        <span>50%</span>
        <span>75%</span>
        <span>100%</span>
      </div>
    </div>
  );
}
