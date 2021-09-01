const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// const config = require('./DB.js');
require("./Receipt")

const Receipt = mongoose.model("receipt")

app.use(bodyParser.json())
const mongURI = "mongodb+srv://DoanhOCR:s7gNMCZT4GhYnkQn@cluster0.wrm8f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(mongURI,{
    useNewUrlParser : true,
    useUnifiedTopology : true
})

// mongoose.Promise = global.Promise;
// mongoose.connect(config.DB, { 
//     useNewUrlParser: true,
//     useUnifiedTopology: true })

mongoose.connection.on("connected",() =>{
    console.log("Connect Success")
})

mongoose.connection.on("error",(err) =>{
    console.log("error",err)
})

app.post('/delete',(req,res) =>{
    Receipt.findByIdAndRemove(req.body.id)
    .then(data => {
        console.log(data)
        res.send(data)
    }).catch(err => {
        console.log("error",err)
    })
})

app.post('/update',(req,res) =>{
    Receipt.findByIdAndUpdate(req.body.id ,{
        name: req.body.name,
        buyer: req.body.buyer,
        picture: req.body.picture,
    }).then(data =>{
        console.log(data)
        res.send(data)
    }).catch(err => {
        console.log("error",err)
    })
})

app.post('/send-data',(req,res) =>{
    const receipt = new Receipt({
        name: req.body.name,
        buyer: req.body.buyer,
        picture: req.body.picture,
    })
    receipt.save()
    .then(data =>{
        console.log(data)
        res.send(data)
    }).catch(err => {
        console.log(err)
    })
})

app.get('/',(req,res) =>{
  Receipt.find({})
  .then(data =>{
      console.log(data)
      res.send(data)
  }).catch(err => {
    console.log(err)
})
})

app.listen(3000, () =>{
    console.log("Listening on 3000")
})