const { check, oneOf } = require('express-validator');

exports.newBookValidation = [
    check('title').exists(),
    check('author','El autor se requiere').exists(),
    check('publicacion','La publicacion es un parametro requerido').exists()
] 