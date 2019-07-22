const express = require('express');
const router = express.Router();

const ProductHeroCtrl = require('../controllers/product-hero');
const AuthCtrl = require('../controllers/auth');

router.post('', ProductHeroCtrl.createHero);
router.get('', AuthCtrl.onlyAuthUser,
               AuthCtrl.onlyAdmin,
               ProductHeroCtrl.getProductHeroes);

router.patch('/:id', AuthCtrl.onlyAuthUser,
                     AuthCtrl.onlyAdmin,
                     ProductHeroCtrl.updateProductHeroes);

module.exports = router;

