import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: String, default: 'pending' }, // New field to track candidate status
  questionSets: [
    {
      setId: { type: mongoose.Schema.Types.ObjectId, ref: 'Set' }, // Reference to the Set
      assignedAt: { type: Date, default: Date.now }, // Track when the set was assigned
    },
  ],
  questions: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' }, // Reference to individual questions
      answered: { type: Boolean, default: false }, // Track if the candidate has answered the question
      answer: { type: String }, // Candidate's answer
      assignedAt: { type: Date, default: Date.now }, // Track when the question was assigned
    },
  ],
});

const Candidate = mongoose.model('Candidate', candidateSchema);

export default Candidate;
