module.exports = (req, res, next) => {
    if (req.user.cart != null) {
        return res.redirect('back');
    }
};