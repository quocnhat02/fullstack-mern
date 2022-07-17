const express = require('express');
const mongoose = require('mongoose');
const app = express();

const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');

require('dotenv').config();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 1000
        });

        console.log('MongoDB connect');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

connectDB();

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);




app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})