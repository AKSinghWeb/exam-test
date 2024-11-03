import Results from '../models/Results.js';

// Controller to fetch candidate results
export const getCandidateResults = async (req, res) => {
    try {
      // Fetch all results from the database
      const results = await Results.find();
  
      // Add total questions to each result
      const updatedResults = results.map((result) => ({
        ...result._doc,
        totalQuestions: result.answers.length,
      }));
  
      // Send the results as a response
      res.status(200).json(updatedResults);
    } catch (error) {
      console.error('Error fetching results:', error);
      res.status(500).json({ message: 'Server error while fetching results.' });
    }
  };

// Controller to fetch a single candidate result by ID
export const getSingleCandidateResult = async (req, res) => {
  const { id } = req.params;
  
  try {
    // Fetch the candidate result by ID
    const candidateResult = await Results.findById(id);

    if (!candidateResult) {
      return res.status(404).json({ message: 'Candidate not found.' });
    }

    // Send the candidate result as a response
    res.status(200).json(candidateResult);
  } catch (error) {
    console.error('Error fetching candidate result:', error);
    res.status(500).json({ message: 'Server error while fetching candidate result.' });
  }
};


export const checkIfCandidateHasSubmittedTest = async (req, res) => {
  const { email } = req.query; // Get the email from query parameters
  
  try {
    // Step 1: Check if a result with the provided email exists
    const candidateResult = await Results.findOne({ email });

    // Step 2: If result is found, return a message
    if (candidateResult) {
      return res.status(200).json({ message: 'You have already given the test.' });
    }

    // If not found, allow them to proceed
    res.status(404).json({ message: 'No results found for this email.' });
  } catch (error) {
    console.error('Error checking candidate by email:', error);
    res.status(500).json({ message: 'Server error while checking candidate.' });
  }
};

