const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../../database.js');
const helpers = require('./helpers.js')

// signin
passport.use('local.signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const rows = await pool.query('SELECT * FROM app_user WHERE username = ?', [username]);
  if(rows.length > 0){
    const user = rows[0];
    const validPassword = await helpers.matchPassword(password, user.password);
    if(validPassword){
      return done(null, user, req.flash('success', 'Bienvenido ' + user.fullname));
    } else{
      return done(null, false, req.flash('danger', 'Contraseña incorrecta'));
    }
  } else{
    return done(null, false, req.flash('danger', 'Usuario no existe'));
  }
}))

// signup
passport.use('local.signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done)=>{

  const namesuser = await pool.query('SELECT username FROM app_user');

  if(namesuser.length > 0){
    for (let i = 0; i < namesuser.length; i++) {
      if(username == namesuser[i + 1]){
        i = namesuser.length + 6;
        return done(null, false, req.flash('danger', 'Usuario ya existe'));
      } else{
        if (i + 1 ==  namesuser.length){
          const { fullname } = req.body;
          const newUser = {username, password, fullname}
          newUser.password = await helpers.encryptPassword(password);

          const result = await pool.query('INSERT INTO app_user SET ?', [newUser]);
          newUser.id = result.insertId;
          return done(null, newUser);
        }
      }
    }
  } else{
    const { fullname } = req.body;
    const newUser = {username, password, fullname}
    newUser.password = await helpers.encryptPassword(password);

    const result = await pool.query('INSERT INTO app_user SET ?', [newUser]);
    newUser.id = result.insertId;
    return done(null, newUser);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM app_user WHERE id = ?', [id]);
  done(null, rows[0]);
})
