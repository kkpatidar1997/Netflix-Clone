const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const app = express();
app.use(cors());
app.use(express.json());
const port = 5000



// get settings
const settings = require('./config/settings')

// mongo db url
const db = settings.mongoDBUrl

// attempt to connect with DB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected successfully.'))
    .catch(err => console.log(err))

// middleware for bodyparser
app.use(bodyParser.urlencoded({extended: false}))

app.get('/',(req,res) => {
    console.log("Project is running.")
})

app.use("/api/user", userRoutes);

app.get('*', function (req, res) {
    res.send('error');
});

app.listen(port, () => console.log(`App running at port : ${port}`))