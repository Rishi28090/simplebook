const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const limit =require('./middlewares/ratelimit.js');
const bookRoutes = require('./routes/bookRoutes.js');

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(limit);
require("./jobs/cron");
 app.use("/api/books", bookRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB CONNECTED"))
.catch((err)=>console.error(err));

// Start Server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));