const Booking = require('../models/Booking');
const Activity = require('../models/Activity');

exports.bookActivity = async (req, res) => {
  const { id } = req.params;
  const activity = await Activity.findById(id);
  const bookingDate = activity.date; 

  try {
    await Booking.create({
      user: req.user,
      activity: id,
      date: bookingDate  
    });

    res.redirect('/bookings');
  } catch (err) {
    console.error("Error creating booking:", err.message);
    res.status(500).send("Error creating booking");
  }
};


exports.getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user }).populate('activity');
  res.render('bookings/myBookings', { bookings });
};


exports.cancelBooking = async (req, res) => {
  const bookingId = req.params.id;

  try {

    const booking = await Booking.findByIdAndDelete(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    return res.status(200).json({ message: 'Booking canceled successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};