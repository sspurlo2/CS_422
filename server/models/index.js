const { query } = require('../config/db');

// Import all models
const Member = require('./member');
const Event = require('./event');
const Attendance = require('./attendance');
const Role = require('./role');
const Workplace = require('./workplace');

// Export all models and db instance
module.exports = {
  Member,
  Event,
  Attendance,
  Role,
  Workplace,
  query, // Direct database access for complex queries
};

