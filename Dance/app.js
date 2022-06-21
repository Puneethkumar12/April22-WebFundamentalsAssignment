const express = require('express');
const app = express();
const fs = require('fs')
const path = require('path')
const bodyparser = require('body-parser')




// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost/contactDance');
}

//Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    number: String,
    email: String,
    desc: String,
});

const Contact = mongoose.model('Contact', contactSchema);

//EXPRESS RELATED CODES
app.use('/static', express.static('static'));//For serving static files we use below code "/static - is the address" "static - is file name"
app.use(express.urlencoded());



//PUG CODES

app.set('view engine', 'pug')//Seting up pug
app.set("views", path.join(__dirname, 'views')) //setting views directory

//END POINT

app.get("/", (req, res) => {
    const pra = {}
    res.render('home.pug', pra)
});

app.get("/contact", (req, res) => {
    const pra = {}
    res.render('contact.pug', pra)

});

app.post("/contact", (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("Thank you for contacting us we will get back shortly 😊")

    }).catch(() => {
        res.status(400).send("Your item was not saved to database")
    })


});







//START SERVER
app.listen(80, () => {
    console.log(`This app started successfully at 80 `)
})
