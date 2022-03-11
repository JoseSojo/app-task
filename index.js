const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySqlStore = require('express-mysql-session');
const passport = require('passport');

const { database } = require('./keys.js')

// Inicialization
const app = express();
require('./src/lib/passport.js')

// Settings
app.set('port', process.env.PORT || 5050);
app.set('views', path.join(__dirname, '/public/'));
app.set('template', path.join(__dirname, '/template/'));
app.engine('.hbs', exphbs.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views')),
  partialsDir: path.join(app.get('template'), '/partials/'),
  extname: '.hbs',
  helpers: require('./src/lib/handlebars.js')
}));
app.set('views engine', '.handlebars');


// Meddlewares
app.use(session({
  secret: 'demo',
  resave: false,
  saveUninitialized: false,
  store: new MySqlStore(database)
}))
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Global Variables
app.use((req, res, next) => {
  app.locals.success = req.flash('success');
  app.locals.danger = req.flash('danger');
  app.locals.user = req.user;
  next();
})

// Routes
app.use(require('./src/router/index.js'));
app.use(require('./src/router/authentication.js'));
app.use('/task', require('./src/router/task.js'));

// Static Files
app.use(express.static(path.join(__dirname, '/assets/')))

// Starting the server
app.listen(app.get('port'), ()=>{
  console.log(`
      Welcome the Server
      Server on port ${app.get('port')}
      press [ctrl] + [c] to exit server
    `)
})
