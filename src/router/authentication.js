const express = require('express');
const router = express.Router();

const pool = require('../../database.js');
const passport = require('passport');

const helpers = require('../lib/helpers.js')
const { isSessionOn } = require('../lib/auth.js');
const { isSessionOff } = require('../lib/auth.js');


router.get('/signup', isSessionOff, (req, res)=>{
  res.render('auth/signup.hbs', {titleTab: 'signup'})
})

router.get('/signin', isSessionOff,async (req, res)=>{
  res.render('auth/signin.hbs', {titleTab: 'signin'});
  const { fullname, username, password } = req.body;

  const newTask = {
    TaskTitle,
    TaskDescription
  }
  await pool.query(`UPDATE links SET ? WHERE id = ?`, [newTask, id]);
})

router.post('/profile/edit/:id', isSessionOn, async (req, res, done)=>{
  const { id } = req.params;
  const namesuser = await pool.query('SELECT username FROM app_user');

  const { username, password, fullname } = req.body;

  for (let i = 0; i < namesuser.length; i++) {
    console.log(username + ' es igual a ' + namesuser[i].username)
    if(username == namesuser[i].username){
      i = namesuser.length + 6;
      console.log('Los usuarios son iguales')
      done(null, false, req.flash('danger', 'Usuario ya existe'));
      res.redirect('/profile');
    } else{
      if (i + 1 ==  namesuser.length){
        const { fullname } = req.body;
        const newData = {username, password, fullname};
        newData.password = await helpers.encryptPassword(password);
        const result = await pool.query(`UPDATE app_user SET ? WHERE id = ?`, [newData, id]);
        done(null, req.flash('success', 'Datos Actualizados '));
        res.redirect('/profile');
      }
    }
  }
})

//////
router.post('/signup', isSessionOff, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}))

router.post('/signin', isSessionOff, (req, res, next) => {
  passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
  })(req, res, next)
})

router.get('/logout', (req, res)=>{
  req.logout();
  res.redirect('/signin');
})

router.get('/profile', isSessionOn, (req, res)=>{
  res.render('profile.hbs', {titleTab: 'profile'})
})

module.exports = router;
