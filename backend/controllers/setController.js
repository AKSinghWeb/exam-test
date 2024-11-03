import Set from '../models/Set.js';


export const createSet = async (req, res) => {
  const { name } = req.body;
  // Validate the name: It should not be empty or null
  if (!name || name.trim() === '') {
    return res.status(400).json({ message: 'Set name is required' });
  }

  try {
    // Create a new set
    const newSet = new Set({ name: name.trim() });

    // Save the set to the database
    await newSet.save();

    // Respond with the newly created set
    res.status(201).json(newSet);

  } catch (error) {
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Set name must be unique' });
    }

    // Handle other errors
    res.status(500).json({ message: 'Error creating set', error: error.message });
  }
};



// Fetch all sets
export const getAllSets = async (req, res) => {
  try {
    const sets = await Set.find();
    res.status(200).json(sets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sets', error: error.message });
  }
};

// Fetch a single set by ID
export const getSetById = async (req, res) => {
  try {
    const set = await Set.findById(req.params.id);

    if (!set) {
      return res.status(404).json({ message: 'Set not found' });
    }

    res.status(200).json(set);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching set', error: error.message });
  }
};

// Delete a set by ID
export const deleteSet = async (req, res) => {
  try {
    const set = await Set.findByIdAndDelete(req.params.id);

    if (!set) {
      return res.status(404).json({ message: 'Set not found' });
    }

    res.status(204).send(); // No content response on successful delete
  } catch (error) {
    res.status(500).json({ message: 'Error deleting set', error: error.message });
  }
};
