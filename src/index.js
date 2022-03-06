const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let date = require('date-and-time')
let ip = require('ip')
app.use(function(req,res,next){
    let url = req.url
    let method = req.method
    const now = new Date();
    const value = date.format(now,"YYYY-MM-DD HH:mm:ss");
    const ipAddress = ip.address();
    console.log("After MiddleWare Call \n",value,",",ipAddress,",",url,",",method);
    // res.send("MiddleWare Hit"):;
    next();
})


mongoose.connect("mongodb+srv://functionup-cohort:G0Loxqc9wFEGyEeJ@cluster0.rzotr.mongodb.net/Pritesh8769811-DB?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
