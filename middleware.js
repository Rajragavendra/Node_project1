const jwt = require('jsonwebtoken');

//---------------------------VALIDATION---------------------------------
module.exports.validatetoken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader != null) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err)
                return res.send('Access denied..')
            req.user = user
            next();

        })
    } else {
        res.status(401).json({
            success: false,
            message: 'Token is not provided',
        });
    }
}
//-------------------------PAGINATION----------------------------------
module.exports.pagination = (req, res, next) => {
    const page = req.query.page
    const limit = req.query.limit

    const skip = (page - 1) * limit;

    req.pagination = {
        limit,
        skip,
        page
    };
    next();
}