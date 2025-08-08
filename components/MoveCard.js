import { useState } from 'react';
import MasterySlider from './MasterySlider';
import toast from 'react-hot-toast';

export default function MoveCard({ move, onUpdate }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [masteryLevel, setMasteryLevel] = useState(move.masteryLevel || 0);
  const [isSaving, setIsSaving] = useState(false);

  const categoryColors = {
    submission: 'bg-red-100 text-red-800',
    guard: 'bg-blue-100 text-blue-800',
    pass: 'bg-green-100 text-green-800',
    sweep: 'bg-yellow-100 text-yellow-800',
    escape: 'bg-purple-100 text-purple-800',
    takedown: 'bg-orange-100 text-orange-800',
  };

  const handleMasteryUpdate = async (newLevel) => {
    setMasteryLevel(newLevel);
    setIsSaving(true);

    try {
      const response = await fetch('/api/progress/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          moveId: move._id,
          masteryLevel: newLevel,
        }),
      });

      if (response.ok) {
        toast.success('Progress updated!');
        if (onUpdate) onUpdate(move._id, newLevel);
      } else {
        toast.error('Failed to update progress');
      }
    } catch (error) {
      toast.error('Error updating progress');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div 
        className="cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{move.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[move.category]}`}>
            {move.category}
          </span>
        </div>
        
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-sm text-gray-600">Belt: {move.belt}</span>
          <span className="text-sm text-gray-600">•</span>
          <span className="text-sm text-gray-600">
            {'⭐'.repeat(move.stripes)} ({move.stripes} stripe{move.stripes > 1 ? 's' : ''})
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${masteryLevel}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-1">Mastery: {masteryLevel}%</p>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <MasterySlider
            value={masteryLevel}
            onChange={handleMasteryUpdate}
            disabled={isSaving}
          />
          {move.lastPracticed && (
            <p className="text-xs text-gray-500 mt-2">
              Last practiced: {new Date(move.lastPracticed).toLocaleDateString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
