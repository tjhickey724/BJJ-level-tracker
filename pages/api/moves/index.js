
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import dbConnect from '../../../lib/mongodb';
import Move from '../../../models/Move';
import UserProgress from '../../../models/UserProgress';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    
    const { belt, stripes } = req.query;
    const query = {};
    
    if (belt) query.belt = belt;
    if (stripes) query.stripes = parseInt(stripes);
    
    const moves = await Move.find(query).sort({ belt: 1, stripes: 1, category: 1 });
    
    // Get user progress for these moves
    const userProgress = await UserProgress.find({
      userId: session.user.id,
      moveId: { $in: moves.map(m => m._id) }
    });
    
    // Combine moves with progress
    const movesWithProgress = moves.map(move => {
      const progress = userProgress.find(p => p.moveId.toString() === move._id.toString());
      return {
        ...move.toObject(),
        masteryLevel: progress ? progress.masteryLevel : 0,
        lastPracticed: progress ? progress.lastPracticed : null,
      };
    });
    
    res.status(200).json(movesWithProgress);
  } catch (error) {
    console.error('Error fetching moves:', error);
    res.status(500).json({ message: 'Error fetching moves' });
  }
}
