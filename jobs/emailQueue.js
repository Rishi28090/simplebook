// jobs/emailQueue.js
const { Queue } = require('bullmq');
require('dotenv').config();

const emailQueue = new Queue('emailQueue', {
  connection: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
  },
});

module.exports = { emailQueue };
