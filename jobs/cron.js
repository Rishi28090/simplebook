const cron = require("node-cron");
const Book = require("../models/Book");
const Author = require("../models/Author");

cron.schedule("0 9 * * *", async () => {
  try {
    const totalBooks = await Book.countDocuments();
    const totalAuthors = await Author.countDocuments();

    console.log(`📅 [CRON] Daily Summary at 9AM`);
    console.log(`📚 Total Books: ${totalBooks}`);
    console.log(`✍️  Total Authors: ${totalAuthors}`);

    // You can extend this to email logic (bonus)
  } catch (err) {
    console.error("❌ CRON Error:", err.message);
  }
});
