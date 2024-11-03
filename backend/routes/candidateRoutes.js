import express from 'express';
import Question from '../models/Question.js'; // Import the Question model
import Results from '../models/Results.js'; // Import the Results model
import Candidate from '../models/Candidate.js'; // Import the Candidate model

const router = express.Router();

router.post('/submit', async (req, res) => {
  const { answers, candidateEmail, candidateName } = req.body;

  try {
    // Step 1: Find the candidate by email and get the setId
    const candidate = await Candidate.findOne({ email: candidateEmail });

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    const setId = candidate.questionSets[0].setId;

    // Step 2: Fetch the questions based on the setId
    const questions = await Question.find({ setId });

    if (!questions || questions.length === 0) {
      return res.status(404).json({ message: 'No questions found for this set' });
    }

    // Step 3: Map through the questions and compare with the user's answers
    const detailedAnswers = questions.map((question, index) => {
      // Extract the user's answer based on index since answers is an array of strings
      const userAnswer = answers[index] || null;

      if (userAnswer === "not attempted" || !userAnswer) {
        return {
          questionText: question.questionText,
          options: question.options,
          correctAnswer: question.correctAnswer,
          userAnswer: "not attempted",
          isCorrect: false, // Not attempted questions do not contribute to score
        };
      }

      const isCorrect = userAnswer === question.correctAnswer;

      return {
        questionText: question.questionText,
        options: question.options,
        correctAnswer: question.correctAnswer,
        userAnswer,
        isCorrect,
      };
    });

    // Step 4: Calculate score based only on questions that were attempted and answered correctly
    const score = detailedAnswers.reduce((acc, answer) => {
      return answer.userAnswer !== "not attempted" && answer.isCorrect ? acc + 1 : acc;
    }, 0);

    // Count only the attempted questions
    const questionsAttempted = detailedAnswers.filter(answer => answer.userAnswer !== "not attempted").length;

    // Step 5: Save the results to the database
    const newResult = new Results({
      candidateName,
      email: candidateEmail,
      appeared: true,
      score,
      questionsAttempted,
      answers: detailedAnswers,
    });

    await newResult.save();
    res.status(201).json({ message: 'Results submitted successfully!!|' });
  } catch (error) {
    console.error('Error saving results:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
