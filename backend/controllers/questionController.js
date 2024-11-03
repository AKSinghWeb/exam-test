import Question from '../models/Question.js';

// Create a new question and associate it with a set
export const createQuestion = async (req, res) => {
  const { questionText, options, correctAnswer, setId } = req.body;
  try {
    // Create a new question associated with the provided setId
    const newQuestion = new Question({ questionText, options, correctAnswer, setId });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    
    res.status(500).json({ message: 'Error creating question', error: error.message });
  }
};

// Fetch all questions (optionally filter by setId)
export const getAllQuestions = async (req, res) => {
  const { setId } = req.query; // Use query parameter to filter by setId if provided

  try {
    // Fetch all questions or filter by setId if provided
    const query = setId ? { setId } : {};
    const questions = await Question.find(query);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions', error: error.message });
  }
};

// Fetch questions by setId (specific route for filtering by set)
export const getQuestionsBySet = async (req, res) => {
  const { setId } = req.params; // Get setId from route parameters

  try {
    const questions = await Question.find({ setId });
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions by set', error: error.message });
  }
};

// Update a question
export const updateQuestion = async (req, res) => {
  const { questionText, options, correctAnswer } = req.body;
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      { questionText, options, correctAnswer },
      { new: true}
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json(updatedQuestion);
  } catch (error) {
    
    res.status(500).json({ message: 'Error updating question', error: error.message });
  }
};

// Delete a question
export const deleteQuestion = async (req, res) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id);

    if (!deletedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(204).send(); // No content to send back
  } catch (error) {
    res.status(500).json({ message: 'Error deleting question', error: error.message });
  }
};
