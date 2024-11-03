import mongoose from 'mongoose';

const setSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Set name is required'],
    trim: true,  // Remove spaces before and after
    unique: true, // Ensure that set names are unique
  }
}, {
  timestamps: true, // Automatically add createdAt and updatedAt timestamps
});

const Set = mongoose.model('Set', setSchema);
export default Set;
