const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getRegister = (req, res) => res.render('auth/register');
exports.getLogin = (req, res) => res.render('auth/login');

exports.postRegister = async (req, res) => {
  const { name, email, phone, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = new User({ name, email, phone, password: hashed });
    await user.save();
    res.redirect('/auth/login');
  } catch {
    res.send('Error registering');
  }
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.send('Invalid credentials');

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.send('Invalid credentials');

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.cookie('token', token, { httpOnly: true });
  res.redirect('/activities');
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/auth/login');
};
