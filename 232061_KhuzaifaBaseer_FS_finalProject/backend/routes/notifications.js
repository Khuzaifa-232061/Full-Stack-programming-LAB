const express = require('express');
const router = express.Router();
const { getMyNotifications, markAsRead, markAllRead, deleteNotification, getUnreadCount } = require('../controllers/notificationController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getMyNotifications);
router.get('/unread-count', protect, getUnreadCount);
router.put('/:id/read', protect, markAsRead);
router.put('/mark-all-read', protect, markAllRead);
router.delete('/:id', protect, deleteNotification);

module.exports = router;
