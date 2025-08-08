import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import MoveCard from '../components/MoveCard';
import BeltSelector from '../components/BeltSelector';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [moves, setMoves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBelt, setSelectedBelt] = useState('all');
  const [selectedStripes, setSelectedStripes] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stats, setStats] = useState({
    totalMoves: 0,
    masteredMoves: 0,
    averageMastery: 0,
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchMoves();
    }
  }, [selectedBelt, selectedStripes, session]);

  const fetchMoves = async () => {
    setLoading(true);
    try {
      let url = '/api/moves';
      const params = new URLSearchParams();
      
      if (selectedBelt !== 'all') params.append('belt', selectedBelt);
      if (selectedStripes !== 'all') params.append('stripes', selectedStripes);
      
      if (params.toString()) url += `?${params.toString()}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      setMoves(data);
      calculateStats(data);
    } catch (error) {
      toast.error('Failed to fetch moves');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (movesData) => {
    const totalMoves = movesData.length;
    const masteredMoves = movesData.filter(m => m.masteryLevel >= 90).length;
    const averageMastery = movesData.length > 0
      ? Math.round(movesData.reduce((acc, m) => acc + (m.masteryLevel || 0), 0) / movesData.length)
      : 0;
    
    setStats({ totalMoves, masteredMoves, averageMastery });
  };

  const handleMoveUpdate = (moveId, newMasteryLevel) => {
    setMoves(prevMoves => 
      prevMoves.map(move => 
        move._id === moveId ? { ...move, masteryLevel: newMasteryLevel } : move
      )
    );
    calculateStats(moves.map(move => 
      move._id === moveId ? { ...move, masteryLevel: newMasteryLevel } : move
    ));
  };

  const filteredMoves = moves.filter(move => {
    if (selectedCategory !== 'all' && move.category !== selectedCategory) return false;
    return true;
  });

  if (status === 'loading' || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome back, {session?.user?.name}!
        </h1>
        <p className="text-gray-600">Track your BJJ journey and master new techniques</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Moves</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalMoves}</p>
            </div>
            <div className="text-3xl">📚</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Mastered</p>
              <p className="text-2xl font-bold text-green-600">{stats.masteredMoves}</p>
            </div>
            <div className="text-3xl">✅</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Mastery</p>
              <p className="text-2xl font-bold text-blue-600">{stats.averageMastery}%</p>
            </div>
            <div className="text-3xl">📈</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Belt Level
            </label>
            <BeltSelector selected={selectedBelt} onChange={setSelectedBelt} />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stripes
            </label>
            <select
              value={selectedStripes}
              onChange={(e) => setSelectedStripes(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="all">All Stripes</option>
              <option value="1">1 Stripe</option>
              <option value="2">2 Stripes</option>
              <option value="3">3 Stripes</option>
              <option value="4">4 Stripes</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="submission">Submissions</option>
              <option value="guard">Guards</option>
              <option value="pass">Passes</option>
              <option value="sweep">Sweeps</option>
              <option value="escape">Escapes</option>
              <option value="takedown">Takedowns</option>
            </select>
          </div>
        </div>
      </div>

      {/* Moves Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMoves.map((move) => (
          <MoveCard
            key={move._id}
            move={move}
            onUpdate={handleMoveUpdate}
          />
        ))}
      </div>

      {filteredMoves.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500">No moves found with the selected filters</p>
        </div>
      )}
    </div>
  );
}