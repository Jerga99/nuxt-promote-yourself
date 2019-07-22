const Product = require('../models/product');
const slugify = require('slugify');

exports.getProducts = function (req, res) {
  Product
    .find({status: 'published'})
    .populate('author -_id -password -products -email -role')
    .populate('category')
    .sort({'updatedAt': -1})
    .exec((errors, products) => {
    if (errors) {
      return res.status(422).send(errors);
    }

    return res.json(products);
    })
}

exports.getInstructorProducts = function (req, res) {
  const userId = req.user.id;

  Product
    .find({author: userId})
    .populate('author')
    .sort({'updatedAt': -1})
    .exec((errors, products) => {
    if (errors) {
      return res.status(422).send(errors);
    }

    return res.json(products);
    })
}

exports.getProductById = (req, res) => {
  const id = req.params.id;

  Product
    .findById(id)
    .populate('category')
    .exec((errors, product) => {
    if (errors) {
      return res.status(422).send(errors);
    }

    return res.json(product);
    })
}

exports.getProductBySlug = (req, res) => {
  const slug = req.params.slug;

  Product
    .findOne({slug})
    .populate('author -_id -password -products -email -role')
    .exec((errors, product) => {
    if (errors) {
      return res.status(422).send(errors);
    }

    return res.json(product);
    })
}

// Needs recheck
exports.createProduct = function (req, res) {
  const productData = req.body;
  const user = req.user;
  const product = new Product(productData);
  product.author = user;

  product.save((errors, createdProduct) => {
    if (errors) {
      return res.status(422).send(errors);
    }

    return res.json(createdProduct);
  });
};

exports.updateProduct = function (req, res) {
  const productId = req.params.id;
  const productData = req.body;

  Product.findById(productId)
        .populate('category')
        .exec((errors, product) => {
    if (errors) {
      return res.status(422).send(errors);
    }

    if (productData.status && productData.status === 'published' && !product.slug) {
    product.slug = slugify(product.title, {
                                replacement: '-',    // replace spaces with replacement
                                remove: null,        // regex to remove characters
                                lower: true          // result in lower case
                              });
    }

    product.set(productData);
    product.save((errors, savedProduct) => {
      if (errors) {
        return res.status(422).send(errors);
      }

      return res.json(savedProduct);
    });
  })
}



