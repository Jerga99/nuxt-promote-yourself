const express = require('express');
const router = express.Router();

const blogCtrl = require('../controllers/blog');
const AuthCtrl = require('../controllers/auth');

router.get('', blogCtrl.getBlogs);

router.get('/medium', blogCtrl.getMediumBlogs);

router.get('/me', AuthCtrl.onlyAuthUser,
                  AuthCtrl.onlyAdmin,
                  blogCtrl.getUserBlogs);

router.get('/:id', blogCtrl.getBlogById);

router.get('/s/:slug', blogCtrl.getBlogBySlug);

router.post('', AuthCtrl.onlyAuthUser,
                AuthCtrl.onlyAdmin,
                blogCtrl.createBlog);

router.patch('/:id', AuthCtrl.onlyAuthUser,
                     AuthCtrl.onlyAdmin,
                     blogCtrl.updateBlog);

router.delete('/:id', AuthCtrl.onlyAuthUser,
                      AuthCtrl.onlyAdmin,
                      blogCtrl.deleteBlog);

module.exports = router;

