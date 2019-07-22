const ProductHero = require('../models/product-hero');

exports.createHero = function (req, res, next) {
  const productData = req.body;

  const productHero = new ProductHero(productData);
  productHero.product = productData.product;

  productHero.save((errors, createdHero) => {
    if (errors) {
      return res.status(422).send(errors);
    }

    return res.json(createdHero);
  });
};

exports.getProductHeroes = function(req, res, next) {

  ProductHero.find({})
            .populate('product')
            .sort({createdAt: -1})
            .exec(function(errors, heroes) {
    if (errors) {
      return res.status(422).send(errors);
    }

    return res.json(heroes);
  })
}

exports.updateProductHeroes = function(req, res, next) {
  const id = req.params.id;

  ProductHero.findById(id)
            .populate('product')
            .exec(function(errors, hero) {
    if (errors) {
      return res.status(422).send(errors);
    }

    hero.set({createdAt: new Date()})
    hero.save((errors, updatedHero) => {
      if (errors) {
        return res.status(422).send(errors);
      }

      return res.json(updatedHero);
      })
    })
  }







