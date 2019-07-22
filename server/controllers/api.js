const ProductHero = require('../models/product-hero');
const passport = require('passport');

exports.getPageData = function (req, res, next) {
  const data = {}
  ProductHero.findOne()
            .sort({createdAt: -1})
            .populate('product')
            .exec(function(errors, productHero) {

    if (errors) {
      return res.status(422).send(errors);
    }

    data.productHero = productHero;
    return res.json(data);
  })
};
