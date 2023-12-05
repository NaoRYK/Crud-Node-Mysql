const express = require('express')
const path = require('path')
const morgan = require('morgan')
const mysql = require('mysql')
const myConnection = require('express-myconnection')


require('dotenv').config()

//Importing rountes


const customerRoutes = require('./routes/customers');
const app = express();
//Settings



app.set('port', process.env.PORT || 3000)

app.set('view engine', 'ejs')

app.set('views',path.join(__dirname,'views') )


//Middlewares

app.use(morgan('dev'))

app.use(myConnection(mysql,{
    host:'db4free.net',
    user: process.env.DBUSER,
    password:process.env.DBPASSWORD,
    port:'3306',
    database:'dbmysqlnao'
},'single'))

app.use(express.urlencoded({extended:false}))


//routes

app.use('/', customerRoutes);

//statics files

app.use(express.static(path.join(__dirname,"public")))



//starting the server
app.listen(app.get('port'), () =>{
    console.log("Server on port ", 3000);
})
