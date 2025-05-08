import express from 'express';
import { User } from '../models/User.js';

const router = express.Router();

// GET /device-summary/:userId/:systemId
router.get('/device-summary/:userId/:systemId', async (req, res) => {
  const { userId, systemId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const device = user.devices.find(dev => dev.systemId === systemId);
    if (!device) return res.status(404).json({ error: 'Device not found' });

    res.json({
      userName: user.name,
      platform: device.platform,
      systemId: device.systemId,
      deviceUserId: device.deviceUserId
      // do NOT return device password for security
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch device summary' });
  }
});

export default router;
