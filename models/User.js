import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: String,
  currentBelt: {
    type: String,
    enum: ['white', 'blue', 'purple', 'brown', 'black'],
    default: 'white',
  },
  currentStripes: {
    type: Number,
    min: 0,
    max: 4,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);

