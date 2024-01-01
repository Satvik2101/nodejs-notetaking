const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');


dotenv.config();

mongoose.connect(process.env.mongoUrl).then(() => {
    console.log("Connected to MongoDB");
})

const app = express();
app.use(express.json());
app.use("/users", userRoutes);
app.use("/notes", noteRoutes);

app.listen("3000", () => {
    console.log("Server is up and running");
})
