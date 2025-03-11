const Medication = require('../models/Medication'); 

module.exports = {
  getUser: async (req, res) => {
    try {
      res.status(200).json({ username: req.user?.username});
    } catch (err) {
      console.log(err);
    }
  },
  createMed: async (req, res) => {
  try {
    const medication =  await Medication.create({...req.body});
    res.status(201).json(medication);
  } catch (error) {
    res.status(400).json({ 
      error: error.message,
      details: error.errors ? Object.values(error.errors).map(err => err.message) : []
    });
  }
},
getAllMed: async (req, res) => {
  try {
    // const createdBy = req.user._id; 
    const medications =  await Medication.find().populate("createdBy", "userName").sort({ createdAt: "desc" }).lean();
    res.status(200).json(medications);
  } catch (error) {
    res.status(400).json({ 
      error: error.message,
      details: error.errors ? Object.values(error.errors).map(err => err.message) : []
    });
  }
},
getMed: async (req, res) => {
  try {
    const userId = req.params.userId
    console.log(userId)
    const medications =  await Medication.find({createdBy: userId}).sort({ createdAt: "desc" }).lean();
    res.status(200).json(medications);
  } catch (error) {
    res.status(400).json({ 
      error: error.message,
      details: error.errors ? Object.values(error.errors).map(err => err.message) : []
    });
  }
},
approveMed: async (req, res) => {
  const medId = req.params.id;
  console.log(medId)
  try {
    const medication = await Medication.findById(medId);
    if (!medication) {
      return res.status(404).json({ error: 'Medication not found' });
    }
    const updatedMed = await Medication.findByIdAndUpdate(
      medId,
      { approved: !medication.approved }, // Toggle the boolean value
      { new: true, upsert: false } 
    );
    res.status(200).json(updatedMed);
  } catch (error) {
    console.error('Error updating approval status:', error);
    res.status(500).json({ error: 'Internal server error' });  }
},

updateMed: async (req, res) => {
  const medId = req.params.id;
  try {
    const medication = await Medication.findById(medId);
    if (!medication) {
      return res.status(404).json({ error: 'Medication not found' });
    }
    const updatedMed = await Medication.findByIdAndUpdate(
      medId,
      { new: true, upsert: false } 
    );
    res.status(200).json(updatedMed);
  } catch (error) {
    console.error('Error updating subscriber:', error);
  }
},

searchAllMed: async (req, res) => {
  try {
    const searchQuery = req.params.name;
    const medications = await Medication.find({
      brandName: searchQuery
    })
    .lean();
    if (!medications) {
      return res.status(404).json({ error: 'Medication not found' });
    }
    res.status(200).json(medications);
  } catch (error) {
    res.status(400).json({
      error: error.message,
      details: error.errors ? Object.values(error.errors).map(err => err.message) : []
    });
  }
  },
  searchMed: async (req, res) => {
    try {
      const searchQuery = req.params.name;
      const medications = await Medication.find({
        brandName: searchQuery, approved: true
      })
      .lean();
      if (!medications) {
        return res.status(404).json({ error: 'Medication not found' });
      }
      res.status(200).json(medications);
    } catch (error) {
      res.status(400).json({
        error: error.message,
        details: error.errors ? Object.values(error.errors).map(err => err.message) : []
      });
    }
    },
};

