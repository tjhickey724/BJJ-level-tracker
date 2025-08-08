import mongoose from 'mongoose';

const MoveSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['submission', 'guard', 'pass', 'sweep', 'escape', 'takedown'],
  },
  belt: {
    type: String,
    required: true,
    enum: ['blue', 'purple', 'brown', 'black'],
  },
  stripes: {
    type: Number,
    required: true,
    min: 1,
    max: 4,
  },
  description: String,
  videoUrl: String,
});

export default mongoose.models.Move || mongoose.model('Move', MoveSchema);
