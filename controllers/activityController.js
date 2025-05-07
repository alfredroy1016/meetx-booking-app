
const Activity = require('../models/Activity');

exports.listActivities = async (req, res) => {
  try {
    const activities = await Activity.find({}, {
      _id: 1,
      title: 1,
      description: 1,
      location: 1,
      date: 1,
      time: 1,
      image: 1,
      type: 1,
      capacity: 1,
      bookedCount: 1,
      duration: 1
    });

    const formattedActivities = activities.map(activity => {
      const formattedDate = new Date(activity.date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });

      return {
        ...activity._doc,
        formattedDate,
        isFull: activity.bookedCount >= activity.capacity
      };
    });

    res.render('activities/list', {
      activities: formattedActivities,
      query: req.query || {},
      currentPage: 1,        
      totalPages: 1,         
      activityTypes: ['sports', 'movies', 'food', 'culture', 'education', 'outdoor', 'technology', 'music', 'other']
    });

  } catch (err) {
    console.error("Kuch gadbad hai yahan:", err.message);
    res.status(500).send("Server mein kuch problem hogaya!");
  }
};
