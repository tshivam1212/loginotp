const express = require('express')
const app = express()
const path = require('path')
const  bodyParser = require('body-parser')
const flash = require('express-flash');
// const ejs = require('ejs')
var expressValidator = require('express-validator');
const  cookieParser = require('cookie-parser')



//const register = require('./views/register.ejs')
const routes = require('./routes/authroute')






//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/register-api',routes)




//error handler
app.use(function (err, req, res, next) {
   
  console.error(err.message); 
  if (!err.statusCode) err.statusCode = 500; 
  res.status(err.statusCode).send(err.message); 
});



app.get('/', function(req, res) {
   
   res.send('api start')

})



app.listen("3080")

module.exports = app;