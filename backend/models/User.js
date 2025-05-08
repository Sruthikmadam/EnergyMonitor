const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  platform: String,
  systemId: String,
  deviceUserId: String,
  devicePassword: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  devices: [deviceSchema]
});
module.exports = mongoose.model('User', userSchema);

// export const User = mongoose.model('User', userSchema);
