const router = require('express').Router();
const { Student, Teacher } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
  try {
    res.render('homepage');
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/signup', async (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    res.status(500).json(err);
  }
});


  router.get('/project/:id', async (req, res) => {
    try {
      const teacherData = await Teacher.findByPk(req.params.id, {
        include: [
          {
            model: Teacher,
            attributes: ['email'],
          },
        ],
      });
  
      const teacher = teacherData.get({ plain: true });
  
      res.render('project', {
        ...project,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });


// Use withAuth middleware to prevent access to route - TEACHER VIEW
router.get('/profile', withAuth, async(req, res) => {
    try {
      // Find the logged in user based on the session ID
      const teacherData = await Teacher.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        // include: [{ model: Teacher }],
      });
  
      const teacher = teacherData.get({ plain: true });
  
      res.render('teacherview', {
        ...teacher,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });


  router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login');
  });

  router.get('/addnewstudent', async (req, res) => {
    try {
      res.render('addnewstudent');
    } catch (err) {
      res.status(500).json(err);
    }
  }
  );

  
module.exports = router;