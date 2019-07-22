const Blog = require('../models/blog');
const slugify = require('slugify');
const request = require('request');
const AsyncLock = require('async-lock');
const lock = new AsyncLock();

const MEDIUM_URL = "https://medium.com/@filipjerga/latest?format=json&limit=20";

function parseFilters(queries) {
  const parsedQueries = {};
  if (queries.filter) {
    Object.keys(queries).forEach((qKey) => {
      if (qKey.includes('filter')) {
        const pKey = qKey.match(/\[([^)]+)\]/)[1]
        parsedQueries[pKey] = queries[qKey]
      }
    })
  }

  return parsedQueries
}

exports.getBlogs = (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || 0;
  const pageNum = parseInt(req.query.pageNum) || 1;
  const skips = pageSize * (pageNum - 1);
  const filters = req.query.filter || {}

  Blog.find({status: 'published', ...filters})
      .sort({'createdAt': -1})
      .populate('author -_id -password -products -email -role')
      .skip(skips)
      .limit(pageSize)
      .exec(function(errors, publishedBlogs) {
    if (errors) {
      return res.status(422).send(errors);
    }

    Blog.count({})
      .then(count => {
        return res.json({blogs: publishedBlogs, count, pageCount: Math.ceil(count / pageSize)});
      });
  });
}

exports.getMediumBlogs = (req, res) => {
  request.get(MEDIUM_URL, (err, apiRes, body) => {
    if (!err && apiRes.statusCode === 200) {
      let i = body.indexOf("{");
      const data = body.substr(i);
      res.send(data)
    } else {
      res.sendStatus(500).json(err);
    }
  });
}


exports.getBlogBySlug = (req, res) => {
  const slug = req.params.slug;

  Blog.findOne({slug})
      .populate('author -_id -password -products -email -role')
      .exec(function(errors, foundBlog) {
    if (errors) {
      return res.status(422).send(errors);
    }

    return res.json(foundBlog);
  });
}

exports.getBlogById = (req, res) => {
  const blogId = req.params.id;

  Blog.findById(blogId, (errors, foundBlog) => {
    if (errors) {
      return res.status(422).send(errors);
    }

    return res.json(foundBlog);
  });
}

exports.getUserBlogs = (req, res) => {
  const user = req.user;

  Blog.find({author: user.id}, function(errors, userBlogs) {
    if (errors) {
     return res.status(422).send(errors);
    }

    return res.json(userBlogs);
  });
}

exports.updateBlog = (req, res) => {
  const blogId = req.params.id;
  const blogData = req.body;

  Blog.findById(blogId, function(errors, foundBlog) {
    if (errors) {
      return res.status(422).send(errors);
    }

    if (blogData.status && blogData.status === 'published' && !foundBlog.slug) {

      foundBlog.slug = slugify(foundBlog.title, {
                                  replacement: '-',    // replace spaces with replacement
                                  remove: null,        // regex to remove characters
                                  lower: true          // result in lower case
                                });

      }

      foundBlog.set(blogData);
      foundBlog.updatedAt = new Date();
      foundBlog.save(function(errors, foundBlog) {
      if (errors) {
        return res.status(422).send(errors);
      }

      return res.json(foundBlog);
    });
  });
}


exports.createBlog = (req, res) => {
  const lockId = req.query.lockId;

  if (!lock.isBusy(lockId)) {
    lock.acquire(lockId, function(done) {
    const blogData = req.body;
    const blog = new Blog(blogData);
    blog.author = req.user;

    blog.save((errors, createdBlog) => {
      setTimeout(() => done(), 5000);

      if (errors) {
        return res.status(422).send(errors);
      }

      return res.json(createdBlog);
    });
    }, function(errors, ret) {
        errors && console.error(errors)
    });
  } else {
    return res.status(422).send({message: 'Blog is getting saved!'});
  }
}


exports.deleteBlog = (req, res) => {
  const blogId = req.params.id;

  Blog.deleteOne({_id: blogId}, function(errors) {
    if (errors) {
      return res.status(422).send(errors);
    }

    res.json({status: 'deleted'});
  });
}







