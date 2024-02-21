//SERVIDOR CON EXPRESS
const express=require('express')
const path= require('path')
const morgan = require('morgan')
const ejs=require('ejs')
const app = express()
require('dotenv').config()

const BooksRoutes=require("./routes/books.js")

//SETTINGS
app.set('appName','Libros')
app.set("port",3000)
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'))



//MIDDLEWARES
app.use(express.text())
app.use(express.json())
app.use(express.urlencoded({extended: false }))
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')));



app.use('/',BooksRoutes)





app.listen(app.get('port'))
console.log(`Server ${app.get('appName')} on port ${app.get('port')}`)