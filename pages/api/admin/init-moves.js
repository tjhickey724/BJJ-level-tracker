import dbConnect from '../../../lib/mongodb';
import Move from '../../../models/Move';

const bjjMoves = [
  // Blue Belt Moves
  { name: 'Armbar from Guard', category: 'submission', belt: 'blue', stripes: 1 },
  { name: 'Triangle Choke', category: 'submission', belt: 'blue', stripes: 1 },
  { name: 'Kimura from Guard', category: 'submission', belt: 'blue', stripes: 2 },
  { name: 'Scissor Sweep', category: 'sweep', belt: 'blue', stripes: 1 },
  { name: 'Hip Bump Sweep', category: 'sweep', belt: 'blue', stripes: 2 },
  { name: 'Knee Shield Pass', category: 'pass', belt: 'blue', stripes: 3 },
  { name: 'Torreando Pass', category: 'pass', belt: 'blue', stripes: 2 },
  { name: 'Bridge and Roll Escape', category: 'escape', belt: 'blue', stripes: 1 },
  { name: 'Elbow Escape', category: 'escape', belt: 'blue', stripes: 1 },
  { name: 'Single Leg Takedown', category: 'takedown', belt: 'blue', stripes: 3 },
  
  // Purple Belt Moves
  { name: 'Omoplata', category: 'submission', belt: 'purple', stripes: 1 },
  { name: 'Bow and Arrow Choke', category: 'submission', belt: 'purple', stripes: 2 },
  { name: 'Cross Collar Choke', category: 'submission', belt: 'purple', stripes: 1 },
  { name: 'Butterfly Sweep', category: 'sweep', belt: 'purple', stripes: 1 },
  { name: 'X-Guard Sweep', category: 'sweep', belt: 'purple', stripes: 3 },
  { name: 'Leg Drag Pass', category: 'pass', belt: 'purple', stripes: 2 },
  { name: 'Stack Pass', category: 'pass', belt: 'purple', stripes: 1 },
  { name: 'De La Riva Guard', category: 'guard', belt: 'purple', stripes: 2 },
  { name: 'Spider Guard', category: 'guard', belt: 'purple', stripes: 3 },
  { name: 'Judo Throw - Seoi Nage', category: 'takedown', belt: 'purple', stripes: 4 },
  
  // Brown Belt Moves
  { name: 'Heel Hook', category: 'submission', belt: 'brown', stripes: 2 },
  { name: 'Calf Slicer', category: 'submission', belt: 'brown', stripes: 3 },
  { name: 'Ezekiel Choke', category: 'submission', belt: 'brown', stripes: 1 },
  { name: 'Berimbolo', category: 'sweep', belt: 'brown', stripes: 4 },
  { name: 'Deep Half Guard Sweep', category: 'sweep', belt: 'brown', stripes: 2 },
  { name: 'Floating Pass', category: 'pass', belt: 'brown', stripes: 3 },
  { name: 'Reverse De La Riva', category: 'guard', belt: 'brown', stripes: 2 },
  { name: 'Worm Guard', category: 'guard', belt: 'brown', stripes: 4 },
  { name: 'Flying Armbar', category: 'submission', belt: 'brown', stripes: 4 },
  
  // Black Belt Moves
  { name: 'Gogoplata', category: 'submission', belt: 'black', stripes: 3 },
  { name: 'Twister', category: 'submission', belt: 'black', stripes: 4 },
  { name: 'Inverted Triangle', category: 'submission', belt: 'black', stripes: 2 },
  { name: 'Matrix Back Take', category: 'sweep', belt: 'black', stripes: 3 },
  { name: 'Kiss of the Dragon', category: 'sweep', belt: 'black', stripes: 4 },
  { name: 'Headquarters Position', category: 'pass', belt: 'black', stripes: 2 },
  { name: 'Lapel Guard Systems', category: 'guard', belt: 'black', stripes: 3 },
  { name: 'Flying Triangle', category: 'submission', belt: 'black', stripes: 4 },
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    
    // Clear existing moves
    await Move.deleteMany({});
    
    // Insert new moves
    const moves = await Move.insertMany(bjjMoves);
    
    res.status(200).json({ 
      message: 'Moves initialized successfully', 
      count: moves.length 
    });
  } catch (error) {
    console.error('Error initializing moves:', error);
    res.status(500).json({ message: 'Error initializing moves' });
  }
}

