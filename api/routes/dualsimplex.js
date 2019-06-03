const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'testando get'
    })
});

router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name
    }
    res.status(201).json({
        message: 'Sucesso',
        createdProduct: product
    })
});

module.exports = router;