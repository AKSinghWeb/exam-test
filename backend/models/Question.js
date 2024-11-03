import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: [true, 'Question text is required'],
    trim: true,
  },
  options: {
    type: [String],
    required: [true, 'Options are required'],
    validate: {
      validator: (v) => v.length >= 2, // Ensure at least two options
      message: 'At least two options are required',
    },
  },
  correctAnswer: {
    type: String,
    required: [true, 'Correct answer is required'],
  },
  setId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the set this question belongs to
    ref: 'Set',
    required: true,
  }
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

const Question = mongoose.model('Question', questionSchema);
export default Question;
