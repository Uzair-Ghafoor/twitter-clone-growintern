import Notification from '../models/notification.model.js';

export const getAllNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const notification = await Notification.find({ to: userId }).populate({
      path: 'from',
      select: 'username profileImg',
    });
    await Notification.updateMany({ to: userId }, { read: true });
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    console.log('Error in getAllNotifications controller: ', error);
  }
};

export const deleteNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    await Notification.deleteMany({ to: userId });
    res.status(200).json({ message: 'Notifications deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    console.log('Error in deleteNotifications controller: ', error);
  }
};
