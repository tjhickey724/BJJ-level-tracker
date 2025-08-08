
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import dbConnect from '../../../lib/mongodb';
import UserProgress from '../../../models/UserProgress';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    
    const { moveId, masteryLevel, notes } = req.body;
    
    const progress = await UserProgress.findOneAndUpdate(
      {
        userId: session.user.id,
        moveId: moveId,
      },
      {
        masteryLevel,
        notes,
        lastPracticed: new Date(),
        updatedAt: new Date(),
      },
      {
        new: true,
        upsert: true,
      }
    );
    
    res.status(200).json(progress);
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ message: 'Error updating progress' });
  }
}
