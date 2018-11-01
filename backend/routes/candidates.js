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
    interviewer: userId,
  });

  if (newCandidate) {
    res.json(newCandidate);
    return;
  }

  res.status(500).json({
    error: "Author of this question didn't find in database. Please relogin and try again",
  });
};

exports.getCandidates = async (req, res) => {
  const user = await User.findById(req.params._id);

  if (!user) {
    res.status(404).json({ error: "User didn't find" });
    return;
  }

  const candidates = await Candidate.find({ interviewer: user._id }).sort({ lastName: 1 });

  res.json(candidates);
};

exports.getCandidate = async (req, res) => {
  const candidate = await Candidate.findById(req.params._id).exec(err => {
    if (err) {
      res.status(500).json({ error: `Candidate with id='${req.params._id}' didn't find` });
    }
  });

  if (candidate) {
    res.json(candidate);
  }
};

exports.provideFeedack = async (req, res) => {
  const candidate = await Candidate.findByIdAndUpdate(req.params._id, req.body, {
    new: true,
  }).exec();

  await candidate.save();

  if (candidate) {
    res.json(candidate);
    return;
  }

  res.status(500).json({ error: "Candidate didn't update" });
};
