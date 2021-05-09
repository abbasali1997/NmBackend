const authService = require('../services/auth.service');

exports.login = async (req, res) => {
    try {
        const foundUser = await authService.find(req.body);
        res.status(200).json(foundUser);
    } catch (e) {
        if (e.code === 'COULD_NOT_FIND_USER' || e.code === 'PASSWORD_INCORRECT') {
            res.json({ success: false, msg: e.message });
        }
        res.status(500).json({ success: false, msg: e.message });
    }
}

exports.register = async (req, res) => {
    const userPayload = await authService.create(req.body);
    res.json(userPayload);
    return;
}