module.exports = (req, res, next) => {
    if (!req.user.isManager) {
        return res.status(404).redirect('/404');
    }
    next();
};