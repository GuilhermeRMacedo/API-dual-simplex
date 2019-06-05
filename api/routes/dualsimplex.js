const express = require('express');
const router = express.Router();
const toDual = require("../utils/toDual")
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'testando get'
    })
});

router.post('/', (req, res, next) => {
    const primal = {
        type: req.body.type,
        variables: req.body.variables,
        restrictions: req.body.restrictions,
        varRestrictions: req.body.var_restriction
    }
    res.status(201).json({
        message: 'Sucesso',
        dual:toDual(primal)
    })
});

module.exports = router;