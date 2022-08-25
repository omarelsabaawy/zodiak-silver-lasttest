module.exports = (req, res, next) => {
    if (res.status(500)) {
        return res.redirect('/500');
    }
}