const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  activity: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Activity', 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },  // Ensure the date field is marked as required
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
