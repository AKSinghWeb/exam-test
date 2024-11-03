import Candidate from '../models/Candidate.js';
import Question from '../models/Question.js';

// Fetch all candidates
export const fetchCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({ message: 'Error fetching candidates' });
  }
};

// Add a new candidate
export const addCandidate = async (req, res) => {
  const { email } = req.body;
  const password = 'xeotec2024';
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const newCandidate = new Candidate({ email, password, status: 'pending' }); // Default status is 'pending'
    await newCandidate.save();
    res.status(201).json(newCandidate);
  } catch (error) {
    console.error('Error adding candidate:', error);
    res.status(500).json({ message: 'Error adding candidate' });
  }
};

// Assign a question set to a candidate
export const assignQuestionSet = async (req, res) => {
  const { email, setId } = req.body;

  if (!email || !setId) {
    return res.status(400).json({ message: 'Email and setId are required' });
  }

  try {
    const candidate = await Candidate.findOne({ email });

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    // Assign the setId and reset the status to "in-progress"
    candidate.questionSets = [{ setId }];
    candidate.status = 'in-progress'; // Update status to 'in-progress' when set is assigned

    await candidate.save();

    res.status(200).json({ message: `Assigned question set ${setId} to candidate ${email}` });
  } catch (error) {
    console.error('Error assigning question set:', error);
    res.status(500).json({ message: 'Error assigning question set' });
  }
};

// Assign individual questions to a candidate
export const assignQuestions = async (req, res) => {
  const { email, questionIds } = req.body;

  if (!email || !questionIds || !Array.isArray(questionIds)) {
    return res.status(400).json({ message: 'Email and questionIds are required' });
  }

  try {
    const candidate = await Candidate.findOne({ email });

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    // Assign each question if not already assigned
    questionIds.forEach((questionId) => {
      const alreadyAssigned = candidate.questions.some(
        (q) => q.questionId.toString() === questionId
      );

      if (!alreadyAssigned) {
        candidate.questions.push({ questionId });
      }
    });

    await candidate.save();
    res.status(200).json({ message: 'Questions assigned successfully' });
  } catch (error) {
    console.error('Error assigning questions:', error);
    res.status(500).json({ message: 'Error assigning questions' });
  }
};

// Fetch candidate status by email
export const getStatusByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    // Find the candidate based on email
    const candidate = await Candidate.findOne({ email });

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    // Check if all questions have been answered
    const answeredQuestions = candidate.questions.filter(q => q.answered);
    if (answeredQuestions.length === candidate.questions.length && candidate.questions.length > 0) {
      candidate.status = 'completed';
      await candidate.save();
    }

    // Return the candidate's status
    res.status(200).json({ status: candidate.status });
  } catch (error) {
    console.error('Error fetching status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch the question set by candidate email
export const getSetByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    // Find the candidate based on email
    const candidate = await Candidate.findOne({ email });

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    const setId = candidate.questionSets[0]?.setId; // Assuming first set is active
    // Find the corresponding question set by setId
    // Fetch all questions or filter by setId if provided
    
    const query = setId ? { setId } : {};
    const questions = await Question.find(query);
    
    if (!questions || questions.length === 0) {
      return res.status(404).json({ message: 'Question set not found' });
    }
    
    // Return set ID and questions
    res.status(200).json({ setId, questions });
  } catch (error) {
    console.error('Error fetching question set:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Set candidate's answer and update status if all questions are answered
export const setCandidateAnswer = async (req, res) => {
  const { email, questionId, answer } = req.body;

  if (!email || !questionId || !answer) {
    return res.status(400).json({ message: 'Email, questionId, and answer are required' });
  }

  try {
    const candidate = await Candidate.findOne({ email });

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    // Find the question by questionId and update the answer
    const question = candidate.questions.find(q => q.questionId.toString() === questionId);

    if (question) {
      question.answered = true;
      question.answer = answer;
    } else {
      return res.status(404).json({ message: 'Question not found for the candidate' });
    }

    // Check if all questions are answered
    const answeredQuestions = candidate.questions.filter(q => q.answered);

    // Update candidate's status based on the number of answered questions
    if (answeredQuestions.length === candidate.questions.length) {
      candidate.status = 'completed';
    }

    await candidate.save();

    res.status(200).json({ message: 'Answer submitted successfully', status: candidate.status });
  } catch (error) {
    console.error('Error submitting answer:', error);
    res.status(500).json({ message: 'Error submitting answer' });
  }
};


// Delete a candidate
export const deleteCandidate = async (req, res) => {
  const { email } = req.params;

  try {
    const candidate = await Candidate.findOneAndDelete({ email });
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    res.status(200).json({ message: `Candidate ${email} has been deleted.` });
  } catch (error) {
    console.error('Error deleting candidate:', error);
    res.status(500).json({ message: 'Error deleting candidate' });
  }
};
