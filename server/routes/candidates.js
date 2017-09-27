import Candidate from '../models/candidate';
import User from '../models/user';

exports.add = async (req, res) => {
  const { firstName, lastName, email, primarySkill, techLevel, notes, userId } = req.body;
  const newCandidate = await Candidate.create({
    firstName,
    lastName,
    email,
    primarySkill,
    techLevel,
    notes,
    interviewer: userId
  });

  res.json(newCandidate);
};

exports.getCandidates = async (req, res) => {
  const user = await User.findById(req.params._id);

  if (!user) {
    res.status(404).json({ error: 'User didn\'t find' });
    return;
  }

  const candidates = await Candidate.find({ interviewer: user._id }).sort({ lastName: 1 });

  res.json(candidates);
};