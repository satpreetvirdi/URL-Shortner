const express = require('express')
const mongoose = require('mongoose')
const ShortUrlGenerator = require('./models/shortUrls')
const app = express()

mongoose.connect('mongodb://localhost/urlShortner' , {
    useNewUrlParser : true, useUnifiedTopology : true 
})
app.set('view engine' , 'ejs')
app.use(express.urlencoded({extended :false}))
app.get('/' ,async (req,res)=>{
    const shorturls = await ShortUrlGenerator.find()
    res.render('index', { shorturls : shortUrls})

})

app.post('/shortUrls' ,async (req ,res)=>{
await ShortUrlGenerator.create({full: req.body.fullUrl})
res.redirect('/')
})


app.listen(process.env.PORT || 5000);