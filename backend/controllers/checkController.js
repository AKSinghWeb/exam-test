import Results from '../models/Results.js';

export const checkIfCandidateHasSubmittedTest = async (req, res) => {
  const { email } = req.query; // Get the email from query parameters
  
  try {
    // Step 1: Check if a result with the provided email exists
    const candidateResult = await Results.findOne({ email });

    // Step 2: If result is found, return a message
    if (candidateResult) {
      return res.status(200).json({ message: 'You have already given the test.' });
    }

    else{
        res.status(201).json({ message: 'You have not given the test' });
    }

  } catch (error) {
    console.error('Error checking candidate by email:', error);
    res.status(500).json({ message: 'Server error while checking candidate.' });
  }
};

