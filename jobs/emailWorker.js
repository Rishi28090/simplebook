// workers/emailWorker.js
const { Worker } = require('bullmq');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Set up the mail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Set up the worker to process jobs
const worker = new Worker(
  'emailQueue',
  async (job) => {
    const { name, email } = job.data;

    const mailOptions = {
      from: `"SimpleBooks" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Welcome to SimpleBooks, ${name}!`,
      text: `Hi ${name},\n\nThanks for joining SimpleBooks as an author!\n\nHappy writing! 📚`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📨 Email sent to ${email}`);
  },
  {
    connection: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
    },
  }
);

// Logging
worker.on('completed', (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`❌ Job ${job.id} failed: ${err.message}`);
});
