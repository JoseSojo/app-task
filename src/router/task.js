const express = require('express');
const router = express.Router();

const pool = require('../../database.js');
const { isSessionOn } = require('../lib/auth.js');
const { isSessionOff } = require('../lib/auth.js');

router.get('/', isSessionOn, async (req, res) => {
  // QUERY DATABASE SEE TASK ALL
  const tasks = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
  res.render('task/list.hbs', { tasks: tasks, titleTab: 'index'});
})

router.get('/add', isSessionOn, (req, res) => {
  res.render('task/add.hbs', {titleTab: 'add'})
})

router.get('/delete/:id', isSessionOn, async (req, res)=>{
  const { id } =  req.params;
  await pool.query('DELETE FROM links WHERE id = ?', [id]);
  req.flash('success', 'Tarea eliminada correctamente');
  res.redirect('/task');
})

router.get('/edit/:id', isSessionOn, async (req, res)=>{
  const { id } =  req.params;
  const tasks = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
  res.render('task/edit.hbs', { tasks: tasks[0] });
})


// POST SAVE NEW TASK
router.post('/add', isSessionOn, async (req, res) => {
  const { TaskTitle, TaskDescription } = req.body;
  const newTask = {
    TaskTitle,
    TaskDescription,
    user_id: req.user.id
  }
  await pool.query('INSERT INTO links SET ?', [newTask]);

  req.flash('success', 'Tarea agregada correctamente');
  res.redirect('/task');
})

router.post('/edit/:id', isSessionOn, async (req, res) => {
  const { id } =  req.params;
  const { TaskTitle, TaskDescription } = req.body;
  const newTask = {
    TaskTitle,
    TaskDescription
  }
  await pool.query(`UPDATE links SET ? WHERE id = ?`, [newTask, id]);
  req.flash('success', 'Tarea editada correctamente');
  res.redirect('/task');
})

module.exports = router;
