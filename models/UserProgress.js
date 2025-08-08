import mongoose from 'mongoose';

const UserProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  moveId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Move',
    required: true,
  },
  masteryLevel: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  lastPracticed: Date,
  notes: String,
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

UserProgressSchema.index({ userId: 1, moveId: 1 }, { unique: true });

export default mongoose.models.UserProgress || mongoose.model('UserProgress', UserProgressSchema);
