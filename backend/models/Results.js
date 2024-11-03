import mongoose from 'mongoose';

const resultsSchema = new mongoose.Schema({
  candidateName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/ // Simple email validation
  },
  appeared: {
    type: Boolean,
    default: true, // Assume the candidate has appeared once they submit answers
  },
  score: {
    type: Number,
    required: true,
  },
  questionsAttempted: {
    type: Number,
    required: true,
  },
  answers: [
    {
      questionText: {
        type: String,
        required: true,
      },
      options: {
        type: [String],
        required: true,
      },
      correctAnswer: {
        type: String,
        required: true,
      },
      userAnswer: {
        type: String,
        required: true,
      },
      isCorrect: {
        type: Boolean,
        required: true,
      },
    },
  ],
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

const Results = mongoose.model('Results', resultsSchema);
export default Results;
