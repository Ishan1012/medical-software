const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const port = 8080;
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/wellnest';

app.use(cors());

// app.get('/', );

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("DB Connected Successfully")
    })
    .catch((err) => {
        console.error("DB Connection Failed", err)
    })


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
