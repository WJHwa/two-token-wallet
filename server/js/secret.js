const crypto = require("crypto");

const salt = crypto.randomBytes(32).toString();

module.exports = salt;
