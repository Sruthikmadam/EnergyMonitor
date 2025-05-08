const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authController.getUser);
router.post('/logout',authController.logout);
// router.get('/auth',authController.authenticateToken)
router.get('/auth', authController.authenticateToken, (req, res) => {
    res.json({ isAuthenticated: true,
      user: req.user, });
  });


module.exports = router;
