const authUtil = require('../util/auth');
const User = require('../mongoose-models/user.model');

exports.create = async (userData) => {
    try {
        const saltHash = authUtil.genPassword(userData.password);
        const salt = saltHash.salt;
        const hash = saltHash.hash;

        delete userData.password;

        const newUser = new User({
            ...userData,
            hash,
            salt,
        });

        await newUser.save();

        if (!newUser) {
            throw new error('Could not create user');
        }

        const jwt = authUtil.issueJWT(newUser);
        return {
            success: true,
            user: newUser,
            token: jwt.token,
            expiresIn: jwt.expires,
        };


    }
    catch (error) {
        console.error("error in AuthService.Create()", error);
        throw error;
    }
}

exports.find = async (userData) => {
    const foundUser = await User.findOne({ email: userData.email }).exec();

    if (!foundUser) {
        const error = new Error('Incorrect Email entered or Email not registered.');
        error.code = "COULD_NOT_FIND_USER";
        throw error;
    }

    const isValid = authUtil.validPassword(userData.password, foundUser.hash, foundUser.salt);

    if (isValid) {
        const jwt = authUtil.issueJWT(foundUser);
        return {
            success: true,
            user: foundUser,
            token: jwt.token,
            expiresIn: jwt.expires,
        }
    } else {
        const error = new Error('Password incorrect');
        error.code = "PASSWORD_INCORRECT";
        throw error;
    }

    return foundUser;
}
