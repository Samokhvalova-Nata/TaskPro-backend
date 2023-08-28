const getCurrent = (req, res) => {
    const { token, _id, name, email, avatarURL, userTheme } = req.user;

    res.status(200).json({
        token,
        user: {
            _id,
            name,
            email,
            avatarURL,
            userTheme,
        }
    });
};

export default getCurrent;