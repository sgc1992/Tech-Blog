const router = require('express').Router();
const { blog, comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all blogs and JOIN with user data
    const blogData = await blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const blogA = blogData.get({ plain: true });

    res.render('blog', {
      blog: blogA,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: blog }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      user,
      logged_in: true,
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

router.get('/', async (req, res) => {
  try {
    const commentData = await comment.findAll({
      include: [
        {
          model: Comment,
          attributes: ['text'],
        },
      ],
    });
    console.log(commentData);
    // Serialize data so the template can read it
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('comment', {
      comments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
