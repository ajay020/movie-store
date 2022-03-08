

//401 unauthorized
//403 forbidden

function admin(req, res, next){
    if(!req.user.isAdmin) return res.status(403).send("forbidden");
    next();
}

module.exports = admin 